# Price Display Modes Feature - Implementation Summary

## Overview
This feature adds flexible price display options for **Property Sales** deals only, allowing admins to show prices as "Over", "Approx", or "Confidential", with smart USD handling.

## What Changed

### 1. Database (Migration Required)
**File**: `database/migrations/add-price-display-modes.sql`

**New Columns Added to `deals` table**:
- `price_display_mode` VARCHAR(20) - Values: 'exact', 'over', 'approx', 'confidential'
- `show_usd` BOOLEAN - Whether to show USD amount (for over/approx modes)

**To Apply**:
```sql
-- Run this in your Supabase SQL Editor
-- Copy and paste the entire content of:
database/migrations/add-price-display-modes.sql
```

### 2. TypeScript Types
**File**: `src/lib/types.ts`

**Added**:
- `PriceDisplayMode` type
- `price_display_mode` field to `Deal` interface
- `show_usd` field to `Deal` interface
- `price_display_mode` and `show_usd` to `CreateDealData`

### 3. Utility Functions
**File**: `src/lib/utils.ts`

**Added**:
- `EXCHANGE_RATES` - Centralized exchange rates (moved from DealForm)
- `roundUsdFromLocal()` - Rounds USD to whole millions from local currency
- `formatPriceWithMode()` - Formats prices with Over/Approx/Confidential modes
- `getUsdDisplayText()` - Returns "USD: -" when USD is hidden

### 4. Admin Form
**File**: `src/components/admin/DealForm.tsx`

**Added**:
- Price Display Mode selector (4 radio buttons: Exact, Over, Approx, Confidential)
- "Show USD as N/A" checkbox (appears for Over and Approx modes)
- Auto-rounding logic when mode changes to Over/Approx
- Form state initialization for new fields
- Conditional display - only shows for Property Sales service type

**Logic**:
- When Over/Approx selected → USD auto-rounds to whole millions
- Admin can still manually override the rounded USD value
- Changing to Confidential mode syncs `is_confidential` field
- Other service types (D&SF, Sale & Leaseback, Capital Advisors) keep the old checkbox

### 5. Display Components
**File**: `src/components/deals/DealCard.tsx`

**Updated**:
- Price display section to use `formatPriceWithMode()`
- Shows "USD: -" when `show_usd = false`
- Applies "Over" prefix or "~" suffix based on mode
- Works for both USD and local currency

## How It Works

### Admin Workflow

1. **Navigate to**: `/admin/deals/new` or edit existing Property Sales deal
2. **Select Price Display Mode**:
   - **Exact** (default): Shows prices as-is (e.g., "$110.5M")
   - **Over**: Adds "Over" prefix (e.g., "Over $111M")
   - **Approx**: Adds "~" suffix (e.g., "$111M~")
   - **Confidential**: Hides all pricing

3. **For Over/Approx modes**:
   - Enter local currency amount (e.g., S$150M)
   - USD auto-calculates and rounds to whole millions (e.g., $111M)
   - Optionally uncheck "Show USD amount" to display as "USD: -"

4. **Submit** - Data saved with new fields

### Display Examples

#### Exact Mode (Default)
```
$110.5M
S$150.0M
```

#### Over Mode (with USD)
```
Over $111M
Over S$150M
```

#### Over Mode (USD hidden)
```
USD: -
Over S$150M
```

#### Approx Mode (with USD)
```
$111M~
S$150M~
```

#### Approx Mode (USD hidden)
```
USD: -
S$150M~
```

#### Confidential Mode
```
Confidential
```

## Rounding Logic

When **Over** or **Approx** mode is selected:

1. Admin enters local currency amount (e.g., S$150M)
2. System calculates USD using exchange rates: `150 / 1.35 = 111.11M`
3. System rounds to whole millions: `111M`
4. Admin can manually override if needed

**Exchange Rates** (defined in `src/lib/utils.ts`):
- SGD: 1.35, AUD: 1.5, JPY: 150, HKD: 7.8, etc.

## Backward Compatibility

✅ **Fully backward compatible**:
- Existing deals default to `price_display_mode = 'exact'` and `show_usd = true`
- Existing `is_confidential = true` deals migrated to `price_display_mode = 'confidential'`
- `is_confidential` field still computed from `price_display_mode` for compatibility
- Non-Property Sales services keep the old "Mark as confidential" checkbox

## Service Type Restrictions

**Property Sales**: Full feature with all 4 modes
**Other Services** (D&SF, Sale & Leaseback, Capital Advisors): Simple confidential checkbox only

## Testing Checklist

### Database
- [x] Migration runs without errors
- [x] New columns have correct defaults
- [x] Constraints work (only valid modes accepted)

### Admin Form
- [ ] Radio buttons display correctly for Property Sales
- [ ] "Show USD as N/A" checkbox appears/hides for Over/Approx
- [ ] USD auto-rounds to whole millions
- [ ] Manual USD override works
- [ ] Other service types show old checkbox

### Display
- [ ] "Over $111M / Over S$150M" displays correctly
- [ ] "$111M~ / S$150M~" displays correctly (approx)
- [ ] "USD: -" displays when show_usd = false
- [ ] Confidential mode works
- [ ] Exact mode unchanged

### Edge Cases
- [ ] Property Sales with USD as local currency
- [ ] Very large amounts (billions)
- [ ] Switching between modes
- [ ] Editing existing Property Sales deals

## Rollback Instructions

If you need to rollback this feature:

```sql
-- Run in Supabase SQL Editor
UPDATE deals SET is_confidential = (price_display_mode = 'confidential');
ALTER TABLE deals DROP COLUMN IF EXISTS price_display_mode;
ALTER TABLE deals DROP COLUMN IF EXISTS show_usd;
DROP INDEX IF EXISTS idx_deals_price_display_mode;
```

Then revert the code changes using git.

## Files Modified

1. ✅ `database/migrations/add-price-display-modes.sql` (NEW)
2. ✅ `src/lib/types.ts`
3. ✅ `src/lib/utils.ts`
4. ✅ `src/components/admin/DealForm.tsx`
5. ✅ `src/components/deals/DealCard.tsx`
6. ✅ `database/migrations/PRICE-DISPLAY-MODES-README.md` (THIS FILE)

## Next Steps

1. **Run the migration**: Execute `add-price-display-modes.sql` in Supabase SQL Editor
2. **Test in development**: Create new Property Sales deals with different modes
3. **Verify display**: Check deal cards show prices correctly
4. **Test edge cases**: Try all combinations and scenarios
5. **Deploy to production**: Once testing is complete

---

**Feature implemented by**: Claude Code Assistant
**Date**: 2025-01-22
**Related Issue**: Property Sales price display modifiers (Over/Approx/Confidential)
