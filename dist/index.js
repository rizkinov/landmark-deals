'use strict';

var React$1 = require('react');
var AccordionPrimitive = require('@radix-ui/react-accordion');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var classVarianceAuthority = require('class-variance-authority');
var AlertDialogPrimitive = require('@radix-ui/react-alert-dialog');
var reactSlot = require('@radix-ui/react-slot');
var AvatarPrimitive = require('@radix-ui/react-avatar');
var reactDayPicker = require('react-day-picker');
var useEmblaCarousel = require('embla-carousel-react');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var DialogPrimitive = require('@radix-ui/react-dialog');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
var reactHookForm = require('react-hook-form');
var HoverCardPrimitive = require('@radix-ui/react-hover-card');
var MenubarPrimitive = require('@radix-ui/react-menubar');
var NavigationMenuPrimitive = require('@radix-ui/react-navigation-menu');
var PopoverPrimitive = require('@radix-ui/react-popover');
var ResizablePrimitive = require('react-resizable-panels');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
var SelectPrimitive = require('@radix-ui/react-select');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
var SliderPrimitive = require('@radix-ui/react-slider');
var nextThemes = require('next-themes');
var sonner = require('sonner');
var SwitchPrimitives = require('@radix-ui/react-switch');
var TabsPrimitive = require('@radix-ui/react-tabs');
var TogglePrimitive = require('@radix-ui/react-toggle');
var ToggleGroupPrimitive = require('@radix-ui/react-toggle-group');
var recharts = require('recharts');
var reactTable = require('@tanstack/react-table');
var Image = require('next/image');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React$1);
var AccordionPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(AccordionPrimitive);
var AlertDialogPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(AlertDialogPrimitive);
var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(AvatarPrimitive);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(CheckboxPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(DialogPrimitive);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(DropdownMenuPrimitive);
var HoverCardPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(HoverCardPrimitive);
var MenubarPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(MenubarPrimitive);
var NavigationMenuPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(NavigationMenuPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(PopoverPrimitive);
var ResizablePrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(ResizablePrimitive);
var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(ScrollAreaPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SelectPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SeparatorPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(TooltipPrimitive);
var SliderPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SliderPrimitive);
var SwitchPrimitives__namespace = /*#__PURE__*/_interopNamespaceDefault(SwitchPrimitives);
var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(TabsPrimitive);
var TogglePrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(TogglePrimitive);
var ToggleGroupPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(ToggleGroupPrimitive);

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectDestructuringEmpty(t) {
  if (null == t) throw new TypeError("Cannot destructure " + t);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

var _excluded$K = ["className"],
  _excluded2$s = ["className", "children"],
  _excluded3$n = ["className", "children"];
function Accordion(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(AccordionPrimitive__namespace.Root, _extends({
    "data-slot": "accordion"
  }, props));
}
function AccordionItem(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded$K);
  return /*#__PURE__*/React__namespace.createElement(AccordionPrimitive__namespace.Item, _extends({
    "data-slot": "accordion-item",
    className: cn("border-b last:border-b-0", className)
  }, props));
}
function AccordionTrigger(_ref3) {
  var className = _ref3.className,
    children = _ref3.children,
    props = _objectWithoutProperties(_ref3, _excluded2$s);
  return /*#__PURE__*/React__namespace.createElement(AccordionPrimitive__namespace.Header, {
    className: "flex"
  }, /*#__PURE__*/React__namespace.createElement(AccordionPrimitive__namespace.Trigger, _extends({
    "data-slot": "accordion-trigger",
    className: cn("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "text-[#003F2D] size-6 shrink-0 transition-transform duration-200"
  })));
}
function AccordionContent(_ref4) {
  var className = _ref4.className,
    children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded3$n);
  return /*#__PURE__*/React__namespace.createElement(AccordionPrimitive__namespace.Content, _extends({
    "data-slot": "accordion-content",
    className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
  }, props), /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("pt-0 pb-4", className)
  }, children));
}

var _excluded$J = ["className", "variant"],
  _excluded2$r = ["className"],
  _excluded3$m = ["className"];
var alertVariants = classVarianceAuthority.cva("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
  variants: {
    variant: {
      "default": "bg-card text-card-foreground",
      destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Alert(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    props = _objectWithoutProperties(_ref, _excluded$J);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "alert",
    role: "alert",
    className: cn(alertVariants({
      variant: variant
    }), className)
  }, props));
}
function AlertTitle(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$r);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "alert-title",
    className: cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)
  }, props));
}
function AlertDescription(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$m);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "alert-description",
    className: cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className)
  }, props));
}

var _excluded$I = ["className", "variant", "size", "asChild"];
var buttonVariants = classVarianceAuthority.cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      "default": "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      "default": "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 px-6 has-[>svg]:px-4",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    _ref$asChild = _ref.asChild,
    asChild = _ref$asChild === void 0 ? false : _ref$asChild,
    props = _objectWithoutProperties(_ref, _excluded$I);
  var Comp = asChild ? reactSlot.Slot : "button";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "button",
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    }))
  }, props));
}

var _excluded$H = ["className"],
  _excluded2$q = ["className"],
  _excluded3$l = ["className"],
  _excluded4$h = ["className"],
  _excluded5$f = ["className"],
  _excluded6$d = ["className"],
  _excluded7$8 = ["className"],
  _excluded8$7 = ["className"];
function AlertDialog(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Root, _extends({
    "data-slot": "alert-dialog"
  }, props));
}
function AlertDialogTrigger(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Trigger, _extends({
    "data-slot": "alert-dialog-trigger"
  }, props));
}
function AlertDialogPortal(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Portal, _extends({
    "data-slot": "alert-dialog-portal"
  }, props));
}
function AlertDialogOverlay(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded$H);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Overlay, _extends({
    "data-slot": "alert-dialog-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function AlertDialogContent(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded2$q);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPortal, null, /*#__PURE__*/React__namespace.createElement(AlertDialogOverlay, null), /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Content, _extends({
    "data-slot": "alert-dialog-content",
    className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
  }, props)));
}
function AlertDialogHeader(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded3$l);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "alert-dialog-header",
    className: cn("flex flex-col gap-2 text-center sm:text-left", className)
  }, props));
}
function AlertDialogFooter(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded4$h);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "alert-dialog-footer",
    className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)
  }, props));
}
function AlertDialogTitle(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded5$f);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Title, _extends({
    "data-slot": "alert-dialog-title",
    className: cn("text-lg font-semibold", className)
  }, props));
}
function AlertDialogDescription(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded6$d);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Description, _extends({
    "data-slot": "alert-dialog-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}
function AlertDialogAction(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded7$8);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Action, _extends({
    className: cn(buttonVariants(), className)
  }, props));
}
function AlertDialogCancel(_ref11) {
  var className = _ref11.className,
    props = _objectWithoutProperties(_ref11, _excluded8$7);
  return /*#__PURE__*/React__namespace.createElement(AlertDialogPrimitive__namespace.Cancel, _extends({
    className: cn(buttonVariants({
      variant: "outline"
    }), className)
  }, props));
}

var _excluded$G = ["className"],
  _excluded2$p = ["className"],
  _excluded3$k = ["className"];
function Avatar(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$G);
  return /*#__PURE__*/React__namespace.createElement(AvatarPrimitive__namespace.Root, _extends({
    "data-slot": "avatar",
    className: cn("relative flex size-8 shrink-0 overflow-hidden", className)
  }, props));
}
function AvatarImage(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$p);
  return /*#__PURE__*/React__namespace.createElement(AvatarPrimitive__namespace.Image, _extends({
    "data-slot": "avatar-image",
    className: cn("aspect-square size-full", className)
  }, props));
}
function AvatarFallback(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$k);
  return /*#__PURE__*/React__namespace.createElement(AvatarPrimitive__namespace.Fallback, _extends({
    "data-slot": "avatar-fallback",
    className: cn("bg-muted flex size-full items-center justify-center", className)
  }, props));
}

var _excluded$F = ["className", "variant", "asChild"];
var badgeVariants$1 = classVarianceAuthority.cva("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
  variants: {
    variant: {
      "default": "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Badge(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    _ref$asChild = _ref.asChild,
    asChild = _ref$asChild === void 0 ? false : _ref$asChild,
    props = _objectWithoutProperties(_ref, _excluded$F);
  var Comp = asChild ? reactSlot.Slot : "span";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "badge",
    className: cn(badgeVariants$1({
      variant: variant
    }), className)
  }, props));
}

var _excluded$E = ["className"],
  _excluded2$o = ["className"],
  _excluded3$j = ["asChild", "className"],
  _excluded4$g = ["className"],
  _excluded5$e = ["children", "className"],
  _excluded6$c = ["className"];
function Breadcrumb(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement("nav", _extends({
    "aria-label": "breadcrumb",
    "data-slot": "breadcrumb"
  }, props));
}
function BreadcrumbList(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded$E);
  return /*#__PURE__*/React__namespace.createElement("ol", _extends({
    "data-slot": "breadcrumb-list",
    className: cn("flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", className)
  }, props));
}
function BreadcrumbItem(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded2$o);
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    "data-slot": "breadcrumb-item",
    className: cn("inline-flex items-center gap-1.5", className)
  }, props));
}
function BreadcrumbLink(_ref4) {
  var asChild = _ref4.asChild,
    className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded3$j);
  var Comp = asChild ? reactSlot.Slot : "a";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "breadcrumb-link",
    className: cn("text-light-grey hover:!text-dark-grey transition-colors duration-300", className)
  }, props));
}
function BreadcrumbPage(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded4$g);
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("text-dark-grey font-medium", className)
  }, props));
}
function BreadcrumbSeparator(_ref6) {
  var children = _ref6.children,
    className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded5$e);
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5 text-light-grey", className)
  }, props), children !== null && children !== void 0 ? children : /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRight, null));
}
function BreadcrumbEllipsis(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded6$c);
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex size-9 items-center justify-center text-light-grey", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.MoreHorizontal, {
    className: "size-4"
  }), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "More"));
}

var _excluded$D = ["className", "classNames", "showOutsideDays"],
  _excluded2$n = ["className"],
  _excluded3$i = ["className"];
function Calendar(_ref) {
  var className = _ref.className,
    classNames = _ref.classNames,
    _ref$showOutsideDays = _ref.showOutsideDays,
    showOutsideDays = _ref$showOutsideDays === void 0 ? true : _ref$showOutsideDays,
    props = _objectWithoutProperties(_ref, _excluded$D);
  return /*#__PURE__*/React__namespace.createElement(reactDayPicker.DayPicker, _extends({
    showOutsideDays: showOutsideDays,
    className: cn("p-3", className),
    classNames: _objectSpread2({
      months: "flex flex-col sm:flex-row gap-2",
      month: "flex flex-col gap-4",
      caption: "flex justify-center pt-1 relative items-center w-full",
      caption_label: "text-sm font-medium",
      nav: "flex items-center gap-1",
      nav_button: cn(buttonVariants({
        variant: "outline"
      }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-x-1",
      head_row: "flex",
      head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"),
      day: cn(buttonVariants({
        variant: "ghost"
      }), "size-8 p-0 font-normal aria-selected:opacity-100"),
      day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
      day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "bg-accent text-accent-foreground",
      day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "invisible"
    }, classNames),
    components: {
      IconLeft: function IconLeft(_ref2) {
        var className = _ref2.className,
          props = _objectWithoutProperties(_ref2, _excluded2$n);
        return /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronLeft, _extends({
          className: cn("size-4", className)
        }, props));
      },
      IconRight: function IconRight(_ref3) {
        var className = _ref3.className,
          props = _objectWithoutProperties(_ref3, _excluded3$i);
        return /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRight, _extends({
          className: cn("size-4", className)
        }, props));
      }
    }
  }, props));
}

var _excluded$C = ["className"],
  _excluded2$m = ["className"],
  _excluded3$h = ["className"],
  _excluded4$f = ["className"],
  _excluded5$d = ["className"],
  _excluded6$b = ["className"],
  _excluded7$7 = ["className"];
function Card(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$C);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card",
    className: cn("bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm", className)
  }, props));
}
function CardHeader(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$m);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-header",
    className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className)
  }, props));
}
function CardTitle(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$h);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-title",
    className: cn("leading-none font-semibold", className)
  }, props));
}
function CardDescription(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$f);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}
function CardAction(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5$d);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-action",
    className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)
  }, props));
}
function CardContent(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6$b);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-content",
    className: cn("px-6", className)
  }, props));
}
function CardFooter(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7$7);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "card-footer",
    className: cn("flex items-center px-6 [.border-t]:pt-6", className)
  }, props));
}

var _excluded$B = ["orientation", "opts", "setApi", "plugins", "className", "children"],
  _excluded2$l = ["className"],
  _excluded3$g = ["className"],
  _excluded4$e = ["className", "variant", "size"],
  _excluded5$c = ["className", "variant", "size"];
var CarouselContext = /*#__PURE__*/React__namespace.createContext(null);
function useCarousel() {
  var context = React__namespace.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
var Carousel = /*#__PURE__*/React__namespace.forwardRef(function (_ref, ref) {
  var _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
    opts = _ref.opts,
    setApi = _ref.setApi,
    plugins = _ref.plugins,
    className = _ref.className,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$B);
  var _useEmblaCarousel = useEmblaCarousel(_objectSpread2(_objectSpread2({}, opts), {}, {
      axis: orientation === "horizontal" ? "x" : "y"
    }), plugins),
    _useEmblaCarousel2 = _slicedToArray(_useEmblaCarousel, 2),
    carouselRef = _useEmblaCarousel2[0],
    api = _useEmblaCarousel2[1];
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    canScrollPrev = _React$useState2[0],
    setCanScrollPrev = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    canScrollNext = _React$useState4[0],
    setCanScrollNext = _React$useState4[1];
  var onSelect = React__namespace.useCallback(function (api) {
    if (!api) {
      return;
    }
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);
  var scrollPrev = React__namespace.useCallback(function () {
    api === null || api === void 0 || api.scrollPrev();
  }, [api]);
  var scrollNext = React__namespace.useCallback(function () {
    api === null || api === void 0 || api.scrollNext();
  }, [api]);
  var handleKeyDown = React__namespace.useCallback(function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);
  React__namespace.useEffect(function () {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  React__namespace.useEffect(function () {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return function () {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);
  return /*#__PURE__*/React__namespace.createElement(CarouselContext.Provider, {
    value: {
      carouselRef: carouselRef,
      api: api,
      opts: opts,
      orientation: orientation || "horizontal",
      scrollPrev: scrollPrev,
      scrollNext: scrollNext,
      canScrollPrev: canScrollPrev,
      canScrollNext: canScrollNext
    }
  }, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: ref,
    onKeyDownCapture: handleKeyDown,
    className: cn("relative", className),
    role: "region",
    "aria-roledescription": "carousel"
  }, props), children));
});
Carousel.displayName = "Carousel";
var CarouselContent = /*#__PURE__*/React__namespace.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$l);
  var _useCarousel = useCarousel(),
    carouselRef = _useCarousel.carouselRef,
    orientation = _useCarousel.orientation;
  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: carouselRef,
    className: "overflow-hidden"
  }, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: ref,
    className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)
  }, props)));
});
CarouselContent.displayName = "CarouselContent";
var CarouselItem = /*#__PURE__*/React__namespace.forwardRef(function (_ref3, ref) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$g);
  var _useCarousel2 = useCarousel(),
    orientation = _useCarousel2.orientation;
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: ref,
    role: "group",
    "aria-roledescription": "slide",
    className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)
  }, props));
});
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = /*#__PURE__*/React__namespace.forwardRef(function (_ref4, ref) {
  var className = _ref4.className,
    _ref4$variant = _ref4.variant,
    variant = _ref4$variant === void 0 ? "outline" : _ref4$variant,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? "icon" : _ref4$size,
    props = _objectWithoutProperties(_ref4, _excluded4$e);
  var _useCarousel3 = useCarousel(),
    orientation = _useCarousel3.orientation,
    scrollPrev = _useCarousel3.scrollPrev,
    canScrollPrev = _useCarousel3.canScrollPrev;
  return /*#__PURE__*/React__namespace.createElement(Button, _extends({
    ref: ref,
    variant: variant,
    size: size,
    className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
    disabled: !canScrollPrev,
    onClick: scrollPrev
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ArrowLeft, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "Previous slide"));
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = /*#__PURE__*/React__namespace.forwardRef(function (_ref5, ref) {
  var className = _ref5.className,
    _ref5$variant = _ref5.variant,
    variant = _ref5$variant === void 0 ? "outline" : _ref5$variant,
    _ref5$size = _ref5.size,
    size = _ref5$size === void 0 ? "icon" : _ref5$size,
    props = _objectWithoutProperties(_ref5, _excluded5$c);
  var _useCarousel4 = useCarousel(),
    orientation = _useCarousel4.orientation,
    scrollNext = _useCarousel4.scrollNext,
    canScrollNext = _useCarousel4.canScrollNext;
  return /*#__PURE__*/React__namespace.createElement(Button, _extends({
    ref: ref,
    variant: variant,
    size: size,
    className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
    disabled: !canScrollNext,
    onClick: scrollNext
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ArrowRight, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "Next slide"));
});
CarouselNext.displayName = "CarouselNext";

var _excluded$A = ["className"];
function Checkbox(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$A);
  return /*#__PURE__*/React__namespace.createElement(CheckboxPrimitive__namespace.Root, _extends({
    "data-slot": "checkbox",
    className: cn("peer size-4 shrink-0 rounded-[0px] border border-input shadow-xs transition-shadow outline-none", "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "hover:border-foreground", "disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:ring-destructive/20 aria-invalid:border-destructive", className)
  }, props), /*#__PURE__*/React__namespace.createElement(CheckboxPrimitive__namespace.Indicator, {
    "data-slot": "checkbox-indicator",
    className: "flex items-center justify-center text-current"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-3.5"
  })));
}

var _excluded$z = ["className"],
  _excluded2$k = ["className", "children"],
  _excluded3$f = ["className"],
  _excluded4$d = ["className"],
  _excluded5$b = ["className"],
  _excluded6$a = ["className"];
function Dialog(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Root, _extends({
    "data-slot": "dialog"
  }, props));
}
function DialogTrigger(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Trigger, _extends({
    "data-slot": "dialog-trigger"
  }, props));
}
function DialogPortal(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Portal, _extends({
    "data-slot": "dialog-portal"
  }, props));
}
function DialogClose(_ref4) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Close, _extends({
    "data-slot": "dialog-close"
  }, props));
}
function DialogOverlay(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded$z);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Overlay, _extends({
    "data-slot": "dialog-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function DialogContent(_ref6) {
  var className = _ref6.className,
    children = _ref6.children,
    props = _objectWithoutProperties(_ref6, _excluded2$k);
  return /*#__PURE__*/React__namespace.createElement(DialogPortal, {
    "data-slot": "dialog-portal"
  }, /*#__PURE__*/React__namespace.createElement(DialogOverlay, null), /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Content, _extends({
    "data-slot": "dialog-content",
    className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Close, {
    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.XIcon, null), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "Close"))));
}
function DialogHeader(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded3$f);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "dialog-header",
    className: cn("flex flex-col gap-2 text-center sm:text-left", className)
  }, props));
}
function DialogFooter(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded4$d);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "dialog-footer",
    className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)
  }, props));
}
function DialogTitle(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded5$b);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Title, _extends({
    "data-slot": "dialog-title",
    className: cn("text-lg leading-none font-semibold", className)
  }, props));
}
function DialogDescription(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded6$a);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Description, _extends({
    "data-slot": "dialog-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}

var _excluded$y = ["className", "sideOffset"],
  _excluded2$j = ["className", "inset", "variant"],
  _excluded3$e = ["className", "children", "checked"],
  _excluded4$c = ["className", "children"],
  _excluded5$a = ["className", "inset"],
  _excluded6$9 = ["className"],
  _excluded7$6 = ["className"],
  _excluded8$6 = ["className", "inset", "children"],
  _excluded9$3 = ["className"];
function DropdownMenu(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Root, _extends({
    "data-slot": "dropdown-menu"
  }, props));
}
function DropdownMenuPortal(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Portal, _extends({
    "data-slot": "dropdown-menu-portal"
  }, props));
}
function DropdownMenuTrigger(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Trigger, _extends({
    "data-slot": "dropdown-menu-trigger"
  }, props));
}
function DropdownMenuContent(_ref4) {
  var className = _ref4.className,
    _ref4$sideOffset = _ref4.sideOffset,
    sideOffset = _ref4$sideOffset === void 0 ? 4 : _ref4$sideOffset,
    props = _objectWithoutProperties(_ref4, _excluded$y);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Content, _extends({
    "data-slot": "dropdown-menu-content",
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-none border border-light-grey p-1 shadow-md", className)
  }, props)));
}
function DropdownMenuGroup(_ref5) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref5), _ref5));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Group, _extends({
    "data-slot": "dropdown-menu-group"
  }, props));
}
function DropdownMenuItem(_ref6) {
  var className = _ref6.className,
    inset = _ref6.inset,
    _ref6$variant = _ref6.variant,
    variant = _ref6$variant === void 0 ? "default" : _ref6$variant,
    props = _objectWithoutProperties(_ref6, _excluded2$j);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Item, _extends({
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-none px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function DropdownMenuCheckboxItem(_ref7) {
  var className = _ref7.className,
    children = _ref7.children,
    checked = _ref7.checked,
    props = _objectWithoutProperties(_ref7, _excluded3$e);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.CheckboxItem, _extends({
    "data-slot": "dropdown-menu-checkbox-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-none py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
    checked: checked
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-4"
  }))), children);
}
function DropdownMenuRadioGroup(_ref8) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref8), _ref8));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.RadioGroup, _extends({
    "data-slot": "dropdown-menu-radio-group"
  }, props));
}
function DropdownMenuRadioItem(_ref9) {
  var className = _ref9.className,
    children = _ref9.children,
    props = _objectWithoutProperties(_ref9, _excluded4$c);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.RadioItem, _extends({
    "data-slot": "dropdown-menu-radio-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-none py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CircleIcon, {
    className: "size-2 fill-current"
  }))), children);
}
function DropdownMenuLabel(_ref10) {
  var className = _ref10.className,
    inset = _ref10.inset,
    props = _objectWithoutProperties(_ref10, _excluded5$a);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Label, _extends({
    "data-slot": "dropdown-menu-label",
    "data-inset": inset,
    className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)
  }, props));
}
function DropdownMenuSeparator(_ref11) {
  var className = _ref11.className,
    props = _objectWithoutProperties(_ref11, _excluded6$9);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Separator, _extends({
    "data-slot": "dropdown-menu-separator",
    className: cn("bg-border -mx-1 my-1 h-px", className)
  }, props));
}
function DropdownMenuShortcut(_ref12) {
  var className = _ref12.className,
    props = _objectWithoutProperties(_ref12, _excluded7$6);
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    "data-slot": "dropdown-menu-shortcut",
    className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className)
  }, props));
}
function DropdownMenuSub(_ref13) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref13), _ref13));
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.Sub, _extends({
    "data-slot": "dropdown-menu-sub"
  }, props));
}
function DropdownMenuSubTrigger(_ref14) {
  var className = _ref14.className,
    inset = _ref14.inset,
    children = _ref14.children,
    props = _objectWithoutProperties(_ref14, _excluded8$6);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.SubTrigger, _extends({
    "data-slot": "dropdown-menu-sub-trigger",
    "data-inset": inset,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-none px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRightIcon, {
    className: "ml-auto size-4"
  }));
}
function DropdownMenuSubContent(_ref15) {
  var className = _ref15.className,
    props = _objectWithoutProperties(_ref15, _excluded9$3);
  return /*#__PURE__*/React__namespace.createElement(DropdownMenuPrimitive__namespace.SubContent, _extends({
    "data-slot": "dropdown-menu-sub-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-none border border-light-grey p-1 shadow-lg", className)
  }, props));
}

var _excluded$x = ["className"];
var Label = /*#__PURE__*/React__namespace.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$x);
  return /*#__PURE__*/React__namespace.createElement("label", _extends({
    ref: ref,
    "data-slot": "label",
    className: cn("text-foreground text-base font-calibre font-medium mb-1.5", "select-none", "peer-disabled:cursor-not-allowed peer-disabled:opacity-50", "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className)
  }, props));
});
Label.displayName = "Label";

var _excluded$w = ["className"],
  _excluded2$i = ["className"],
  _excluded3$d = ["className"],
  _excluded4$b = ["className"],
  _excluded5$9 = ["className"];
var Form = reactHookForm.FormProvider;
var FormFieldContext = /*#__PURE__*/React__namespace.createContext({});
var FormField = function FormField(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(FormFieldContext.Provider, {
    value: {
      name: props.name
    }
  }, /*#__PURE__*/React__namespace.createElement(reactHookForm.Controller, props));
};
var useFormField = function useFormField() {
  var fieldContext = React__namespace.useContext(FormFieldContext);
  var itemContext = React__namespace.useContext(FormItemContext);
  var _useFormContext = reactHookForm.useFormContext(),
    getFieldState = _useFormContext.getFieldState;
  var formState = reactHookForm.useFormState({
    name: fieldContext.name
  });
  var fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  var id = itemContext.id;
  return _objectSpread2({
    id: id,
    name: fieldContext.name,
    formItemId: "".concat(id, "-form-item"),
    formDescriptionId: "".concat(id, "-form-item-description"),
    formMessageId: "".concat(id, "-form-item-message")
  }, fieldState);
};
var FormItemContext = /*#__PURE__*/React__namespace.createContext({});
function FormItem(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded$w);
  var id = React__namespace.useId();
  return /*#__PURE__*/React__namespace.createElement(FormItemContext.Provider, {
    value: {
      id: id
    }
  }, /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "form-item",
    className: cn("grid gap-2", className)
  }, props)));
}
function FormLabel(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded2$i);
  var _useFormField = useFormField(),
    error = _useFormField.error,
    formItemId = _useFormField.formItemId;
  return /*#__PURE__*/React__namespace.createElement(Label, _extends({
    "data-slot": "form-label",
    "data-error": !!error,
    className: cn("data-[error=true]:text-destructive", className),
    htmlFor: formItemId
  }, props));
}
function FormControl(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded3$d);
  var _useFormField2 = useFormField(),
    error = _useFormField2.error,
    formItemId = _useFormField2.formItemId,
    formDescriptionId = _useFormField2.formDescriptionId,
    formMessageId = _useFormField2.formMessageId;
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "form-control",
    id: formItemId,
    "aria-describedby": !error ? "".concat(formDescriptionId) : "".concat(formDescriptionId, " ").concat(formMessageId),
    "aria-invalid": !!error,
    className: cn(className)
  }, props));
}
function FormDescription(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded4$b);
  var _useFormField3 = useFormField(),
    formDescriptionId = _useFormField3.formDescriptionId;
  return /*#__PURE__*/React__namespace.createElement("p", _extends({
    "data-slot": "form-description",
    id: formDescriptionId,
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}
function FormMessage(_ref6) {
  var _error$message;
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded5$9);
  var _useFormField4 = useFormField(),
    error = _useFormField4.error,
    formMessageId = _useFormField4.formMessageId;
  var body = error ? String((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "") : props.children;
  if (!body) {
    return null;
  }
  return /*#__PURE__*/React__namespace.createElement("p", _extends({
    "data-slot": "form-message",
    id: formMessageId,
    className: cn("text-destructive text-sm", className)
  }, props), body);
}

var _excluded$v = ["className", "align", "sideOffset"];
function HoverCard(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(HoverCardPrimitive__namespace.Root, _extends({
    "data-slot": "hover-card"
  }, props));
}
function HoverCardTrigger(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(HoverCardPrimitive__namespace.Trigger, _extends({
    "data-slot": "hover-card-trigger"
  }, props));
}
function HoverCardContent(_ref3) {
  var className = _ref3.className,
    _ref3$align = _ref3.align,
    align = _ref3$align === void 0 ? "center" : _ref3$align,
    _ref3$sideOffset = _ref3.sideOffset,
    sideOffset = _ref3$sideOffset === void 0 ? 4 : _ref3$sideOffset,
    props = _objectWithoutProperties(_ref3, _excluded$v);
  return /*#__PURE__*/React__namespace.createElement(HoverCardPrimitive__namespace.Portal, {
    "data-slot": "hover-card-portal"
  }, /*#__PURE__*/React__namespace.createElement(HoverCardPrimitive__namespace.Content, _extends({
    "data-slot": "hover-card-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}

var _excluded$u = ["className", "type"];
function Input(_ref) {
  var className = _ref.className,
    type = _ref.type,
    props = _objectWithoutProperties(_ref, _excluded$u);
  return /*#__PURE__*/React__namespace.createElement("input", _extends({
    type: type,
    "data-slot": "input",
    className: cn("border-input bg-transparent file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground", "h-10 w-full px-3 py-2 text-base shadow-xs outline-none", "border rounded-[0px]", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 aria-invalid:border-destructive", "file:border-0 file:bg-transparent file:text-sm file:font-medium", "disabled:cursor-not-allowed disabled:opacity-50", "hover:border-foreground", "transition-[color,box-shadow]", "font-calibre", className)
  }, props));
}

var _excluded$t = ["className"],
  _excluded2$h = ["className"],
  _excluded3$c = ["className", "align", "alignOffset", "sideOffset"],
  _excluded4$a = ["className", "inset", "variant"],
  _excluded5$8 = ["className", "children", "checked"],
  _excluded6$8 = ["className", "children"],
  _excluded7$5 = ["className", "inset"],
  _excluded8$5 = ["className"],
  _excluded9$2 = ["className"],
  _excluded10$2 = ["className", "inset", "children"],
  _excluded11$2 = ["className"];
function Menubar(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$t);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Root, _extends({
    "data-slot": "menubar",
    className: cn("bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs", className)
  }, props));
}
function MenubarMenu(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Menu, _extends({
    "data-slot": "menubar-menu"
  }, props));
}
function MenubarGroup(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Group, _extends({
    "data-slot": "menubar-group"
  }, props));
}
function MenubarPortal(_ref4) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Portal, _extends({
    "data-slot": "menubar-portal"
  }, props));
}
function MenubarRadioGroup(_ref5) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref5), _ref5));
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.RadioGroup, _extends({
    "data-slot": "menubar-radio-group"
  }, props));
}
function MenubarTrigger(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded2$h);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Trigger, _extends({
    "data-slot": "menubar-trigger",
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none", className)
  }, props));
}
function MenubarContent(_ref7) {
  var className = _ref7.className,
    _ref7$align = _ref7.align,
    align = _ref7$align === void 0 ? "start" : _ref7$align,
    _ref7$alignOffset = _ref7.alignOffset,
    alignOffset = _ref7$alignOffset === void 0 ? -4 : _ref7$alignOffset,
    _ref7$sideOffset = _ref7.sideOffset,
    sideOffset = _ref7$sideOffset === void 0 ? 8 : _ref7$sideOffset,
    props = _objectWithoutProperties(_ref7, _excluded3$c);
  return /*#__PURE__*/React__namespace.createElement(MenubarPortal, null, /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Content, _extends({
    "data-slot": "menubar-content",
    align: align,
    alignOffset: alignOffset,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md", className)
  }, props)));
}
function MenubarItem(_ref8) {
  var className = _ref8.className,
    inset = _ref8.inset,
    _ref8$variant = _ref8.variant,
    variant = _ref8$variant === void 0 ? "default" : _ref8$variant,
    props = _objectWithoutProperties(_ref8, _excluded4$a);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Item, _extends({
    "data-slot": "menubar-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function MenubarCheckboxItem(_ref9) {
  var className = _ref9.className,
    children = _ref9.children,
    checked = _ref9.checked,
    props = _objectWithoutProperties(_ref9, _excluded5$8);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.CheckboxItem, _extends({
    "data-slot": "menubar-checkbox-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
    checked: checked
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-4"
  }))), children);
}
function MenubarRadioItem(_ref10) {
  var className = _ref10.className,
    children = _ref10.children,
    props = _objectWithoutProperties(_ref10, _excluded6$8);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.RadioItem, _extends({
    "data-slot": "menubar-radio-item",
    className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CircleIcon, {
    className: "size-2 fill-current"
  }))), children);
}
function MenubarLabel(_ref11) {
  var className = _ref11.className,
    inset = _ref11.inset,
    props = _objectWithoutProperties(_ref11, _excluded7$5);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Label, _extends({
    "data-slot": "menubar-label",
    "data-inset": inset,
    className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)
  }, props));
}
function MenubarSeparator(_ref12) {
  var className = _ref12.className,
    props = _objectWithoutProperties(_ref12, _excluded8$5);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Separator, _extends({
    "data-slot": "menubar-separator",
    className: cn("bg-border -mx-1 my-1 h-px", className)
  }, props));
}
function MenubarShortcut(_ref13) {
  var className = _ref13.className,
    props = _objectWithoutProperties(_ref13, _excluded9$2);
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    "data-slot": "menubar-shortcut",
    className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className)
  }, props));
}
function MenubarSub(_ref14) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref14), _ref14));
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.Sub, _extends({
    "data-slot": "menubar-sub"
  }, props));
}
function MenubarSubTrigger(_ref15) {
  var className = _ref15.className,
    inset = _ref15.inset,
    children = _ref15.children,
    props = _objectWithoutProperties(_ref15, _excluded10$2);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.SubTrigger, _extends({
    "data-slot": "menubar-sub-trigger",
    "data-inset": inset,
    className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRightIcon, {
    className: "ml-auto h-4 w-4"
  }));
}
function MenubarSubContent(_ref16) {
  var className = _ref16.className,
    props = _objectWithoutProperties(_ref16, _excluded11$2);
  return /*#__PURE__*/React__namespace.createElement(MenubarPrimitive__namespace.SubContent, _extends({
    "data-slot": "menubar-sub-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className)
  }, props));
}

var _excluded$s = ["className", "children", "viewport"],
  _excluded2$g = ["className"],
  _excluded3$b = ["className"],
  _excluded4$9 = ["className", "children"],
  _excluded5$7 = ["className"],
  _excluded6$7 = ["className"],
  _excluded7$4 = ["className"],
  _excluded8$4 = ["className"];
function NavigationMenu(_ref) {
  var className = _ref.className,
    children = _ref.children,
    _ref$viewport = _ref.viewport,
    viewport = _ref$viewport === void 0 ? true : _ref$viewport,
    props = _objectWithoutProperties(_ref, _excluded$s);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Root, _extends({
    "data-slot": "navigation-menu",
    "data-viewport": viewport,
    className: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)
  }, props), children, viewport && /*#__PURE__*/React__namespace.createElement(NavigationMenuViewport, null));
}
function NavigationMenuList(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$g);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.List, _extends({
    "data-slot": "navigation-menu-list",
    className: cn("group flex flex-1 list-none items-center justify-center gap-1", className)
  }, props));
}
function NavigationMenuItem(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$b);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Item, _extends({
    "data-slot": "navigation-menu-item",
    className: cn("relative", className)
  }, props));
}
var navigationMenuTriggerStyle = classVarianceAuthority.cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1");
function NavigationMenuTrigger(_ref4) {
  var className = _ref4.className,
    children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded4$9);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Trigger, _extends({
    "data-slot": "navigation-menu-trigger",
    className: cn(navigationMenuTriggerStyle(), "group", className)
  }, props), children, " ", /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
    "aria-hidden": "true"
  }));
}
function NavigationMenuContent(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5$7);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Content, _extends({
    "data-slot": "navigation-menu-content",
    className: cn("data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none", className)
  }, props));
}
function NavigationMenuViewport(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6$7);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("absolute top-full left-0 isolate z-50 flex justify-center")
  }, /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Viewport, _extends({
    "data-slot": "navigation-menu-viewport",
    className: cn("origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]", className)
  }, props)));
}
function NavigationMenuLink(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7$4);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Link, _extends({
    "data-slot": "navigation-menu-link",
    className: cn("data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function NavigationMenuIndicator(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded8$4);
  return /*#__PURE__*/React__namespace.createElement(NavigationMenuPrimitive__namespace.Indicator, _extends({
    "data-slot": "navigation-menu-indicator",
    className: cn("data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", className)
  }, props), /*#__PURE__*/React__namespace.createElement("div", {
    className: "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md"
  }));
}

var _excluded$r = ["className"],
  _excluded2$f = ["className"],
  _excluded3$a = ["className", "isActive", "size"],
  _excluded4$8 = ["className"],
  _excluded5$6 = ["className"],
  _excluded6$6 = ["className"];
function Pagination(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$r);
  return /*#__PURE__*/React__namespace.createElement("nav", _extends({
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    className: cn("mx-auto flex w-full justify-center", className)
  }, props));
}
function PaginationContent(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$f);
  return /*#__PURE__*/React__namespace.createElement("ul", _extends({
    "data-slot": "pagination-content",
    className: cn("flex flex-row items-center gap-1", className)
  }, props));
}
function PaginationItem(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    "data-slot": "pagination-item"
  }, props));
}
function PaginationLink(_ref4) {
  var className = _ref4.className,
    isActive = _ref4.isActive,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? "icon" : _ref4$size,
    props = _objectWithoutProperties(_ref4, _excluded3$a);
  return /*#__PURE__*/React__namespace.createElement("a", _extends({
    "aria-current": isActive ? "page" : undefined,
    "data-slot": "pagination-link",
    "data-active": isActive,
    className: cn(buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size: size
    }), className)
  }, props));
}
function PaginationPrevious(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded4$8);
  return /*#__PURE__*/React__namespace.createElement(PaginationLink, _extends({
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 px-2.5 sm:pl-2.5", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronLeftIcon, null), /*#__PURE__*/React__namespace.createElement("span", {
    className: "hidden sm:block"
  }, "Previous"));
}
function PaginationNext(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded5$6);
  return /*#__PURE__*/React__namespace.createElement(PaginationLink, _extends({
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 px-2.5 sm:pr-2.5", className)
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "hidden sm:block"
  }, "Next"), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRightIcon, null));
}
function PaginationEllipsis(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded6$6);
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    "aria-hidden": true,
    "data-slot": "pagination-ellipsis",
    className: cn("flex size-9 items-center justify-center", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.MoreHorizontalIcon, {
    className: "size-4"
  }), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "More pages"));
}

var _excluded$q = ["className", "align", "sideOffset"];
function Popover(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Root, _extends({
    "data-slot": "popover"
  }, props));
}
function PopoverTrigger(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Trigger, _extends({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent(_ref3) {
  var className = _ref3.className,
    _ref3$align = _ref3.align,
    align = _ref3$align === void 0 ? "center" : _ref3$align,
    _ref3$sideOffset = _ref3.sideOffset,
    sideOffset = _ref3$sideOffset === void 0 ? 4 : _ref3$sideOffset,
    props = _objectWithoutProperties(_ref3, _excluded$q);
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Content, _extends({
    "data-slot": "popover-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}
function PopoverAnchor(_ref4) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Anchor, _extends({
    "data-slot": "popover-anchor"
  }, props));
}

var _excluded$p = ["className"],
  _excluded2$e = ["withHandle", "className"];
function ResizablePanelGroup(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$p);
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.PanelGroup, _extends({
    "data-slot": "resizable-panel-group",
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)
  }, props));
}
function ResizablePanel(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.Panel, _extends({
    "data-slot": "resizable-panel"
  }, props));
}
function ResizableHandle(_ref3) {
  var withHandle = _ref3.withHandle,
    className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded2$e);
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.PanelResizeHandle, _extends({
    "data-slot": "resizable-handle",
    className: cn("bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className)
  }, props), withHandle && /*#__PURE__*/React__namespace.createElement("div", {
    className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.GripVerticalIcon, {
    className: "size-2.5"
  })));
}

var _excluded$o = ["className", "children"],
  _excluded2$d = ["className", "orientation"];
function ScrollArea(_ref) {
  var className = _ref.className,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$o);
  return /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Root, _extends({
    "data-slot": "scroll-area",
    className: cn("relative", className)
  }, props), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Viewport, {
    "data-slot": "scroll-area-viewport",
    className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
  }, children), /*#__PURE__*/React__namespace.createElement(ScrollBar, null), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Corner, null));
}
function ScrollBar(_ref2) {
  var className = _ref2.className,
    _ref2$orientation = _ref2.orientation,
    orientation = _ref2$orientation === void 0 ? "vertical" : _ref2$orientation,
    props = _objectWithoutProperties(_ref2, _excluded2$d);
  return /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.ScrollAreaScrollbar, _extends({
    "data-slot": "scroll-area-scrollbar",
    orientation: orientation,
    className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)
  }, props), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.ScrollAreaThumb, {
    "data-slot": "scroll-area-thumb",
    className: "bg-border relative flex-1 rounded-full"
  }));
}

var _excluded$n = ["className"],
  _excluded2$c = ["className", "size", "children"],
  _excluded3$9 = ["className", "children", "position"],
  _excluded4$7 = ["className"],
  _excluded5$5 = ["className", "children"],
  _excluded6$5 = ["className"],
  _excluded7$3 = ["className"],
  _excluded8$3 = ["className"];
function Select(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Root, _extends({
    "data-slot": "select"
  }, props));
}
function SelectGroup(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded$n);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Group, _extends({
    "data-slot": "select-group",
    className: cn("mb-2 last:mb-0", className)
  }, props));
}
function SelectValue(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Value, _extends({
    "data-slot": "select-value"
  }, props));
}
function SelectTrigger(_ref4) {
  var className = _ref4.className,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? "default" : _ref4$size,
    children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded2$c);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Trigger, _extends({
    "data-slot": "select-trigger",
    "data-size": size,
    className: cn("border-input bg-transparent text-foreground placeholder:text-muted-foreground", "flex w-full items-center justify-between gap-2 border rounded-[0px] px-3 py-2 text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "hover:border-foreground", "aria-invalid:ring-destructive/20 aria-invalid:border-destructive", "shadow-xs transition-[color,box-shadow] outline-none", "disabled:cursor-not-allowed disabled:opacity-50", "data-[size=default]:h-10 data-[size=sm]:h-8", "font-calibre", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Icon, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "size-4 opacity-50"
  })));
}
function SelectContent(_ref5) {
  var className = _ref5.className,
    children = _ref5.children,
    _ref5$position = _ref5.position,
    position = _ref5$position === void 0 ? "popper" : _ref5$position,
    props = _objectWithoutProperties(_ref5, _excluded3$9);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Content, _extends({
    "data-slot": "select-content",
    className: cn("bg-popover text-popover-foreground", "relative z-50 min-w-[8rem] rounded-[0px] border shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", "overflow-hidden", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
    position: position
  }, props), /*#__PURE__*/React__namespace.createElement(SelectScrollUpButton, null), /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Viewport, {
    className: cn("p-2", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")
  }, children), /*#__PURE__*/React__namespace.createElement(SelectScrollDownButton, null)));
}
function SelectLabel(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded4$7);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Label, _extends({
    "data-slot": "select-label",
    className: cn("text-muted-foreground px-2 py-2 text-xs font-calibre font-medium mb-1", className)
  }, props));
}
function SelectItem(_ref7) {
  var className = _ref7.className,
    children = _ref7.children,
    props = _objectWithoutProperties(_ref7, _excluded5$5);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Item, _extends({
    "data-slot": "select-item",
    className: cn("relative flex w-full cursor-default select-none items-center gap-2 rounded-[0px] py-1.5 pr-8 pl-2 text-sm outline-none", "focus:bg-accent focus:text-accent-foreground", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", "font-calibre", className)
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "absolute right-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-4 text-primary"
  }))), /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ItemText, null, children));
}
function SelectSeparator(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded6$5);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Separator, _extends({
    "data-slot": "select-separator",
    className: cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)
  }, props));
}
function SelectScrollUpButton(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded7$3);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ScrollUpButton, _extends({
    "data-slot": "select-scroll-up-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronUpIcon, {
    className: "size-4"
  }));
}
function SelectScrollDownButton(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded8$3);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ScrollDownButton, _extends({
    "data-slot": "select-scroll-down-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "size-4"
  }));
}

var _excluded$m = ["className", "orientation", "decorative"];
function Separator(_ref) {
  var className = _ref.className,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
    _ref$decorative = _ref.decorative,
    decorative = _ref$decorative === void 0 ? true : _ref$decorative,
    props = _objectWithoutProperties(_ref, _excluded$m);
  return /*#__PURE__*/React__namespace.createElement(SeparatorPrimitive__namespace.Root, _extends({
    "data-slot": "separator-root",
    decorative: decorative,
    orientation: orientation,
    className: cn("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)
  }, props));
}

var _excluded$l = ["className"],
  _excluded2$b = ["className", "children", "side"],
  _excluded3$8 = ["className"],
  _excluded4$6 = ["className"],
  _excluded5$4 = ["className"],
  _excluded6$4 = ["className"];
function Sheet(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Root, _extends({
    "data-slot": "sheet"
  }, props));
}
function SheetTrigger(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Trigger, _extends({
    "data-slot": "sheet-trigger"
  }, props));
}
function SheetClose(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Close, _extends({
    "data-slot": "sheet-close"
  }, props));
}
function SheetPortal(_ref4) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref4), _ref4));
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Portal, _extends({
    "data-slot": "sheet-portal"
  }, props));
}
function SheetOverlay(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded$l);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Overlay, _extends({
    "data-slot": "sheet-overlay",
    className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function SheetContent(_ref6) {
  var className = _ref6.className,
    children = _ref6.children,
    _ref6$side = _ref6.side,
    side = _ref6$side === void 0 ? "right" : _ref6$side,
    props = _objectWithoutProperties(_ref6, _excluded2$b);
  return /*#__PURE__*/React__namespace.createElement(SheetPortal, null, /*#__PURE__*/React__namespace.createElement(SheetOverlay, null), /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Content, _extends({
    "data-slot": "sheet-content",
    className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Close, {
    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.XIcon, {
    className: "size-4"
  }), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "Close"))));
}
function SheetHeader(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded3$8);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sheet-header",
    className: cn("flex flex-col gap-1.5 p-4", className)
  }, props));
}
function SheetFooter(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded4$6);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sheet-footer",
    className: cn("mt-auto flex flex-col gap-2 p-4", className)
  }, props));
}
function SheetTitle(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded5$4);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Title, _extends({
    "data-slot": "sheet-title",
    className: cn("text-foreground font-semibold", className)
  }, props));
}
function SheetDescription(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded6$4);
  return /*#__PURE__*/React__namespace.createElement(DialogPrimitive__namespace.Description, _extends({
    "data-slot": "sheet-description",
    className: cn("text-muted-foreground text-sm", className)
  }, props));
}

var MOBILE_BREAKPOINT$1 = 768;
function useIsMobile$1() {
  var _React$useState = React__namespace.useState(undefined),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isMobile = _React$useState2[0],
    setIsMobile = _React$useState2[1];
  React__namespace.useEffect(function () {
    var mql = window.matchMedia("(max-width: ".concat(MOBILE_BREAKPOINT$1 - 1, "px)"));
    var onChange = function onChange() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT$1);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT$1);
    return function () {
      return mql.removeEventListener("change", onChange);
    };
  }, []);
  return !!isMobile;
}

var _excluded$k = ["className"];
function Skeleton(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$k);
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "skeleton",
    className: cn("bg-accent animate-pulse rounded-md", className)
  }, props));
}

var _excluded$j = ["delayDuration"],
  _excluded2$a = ["className", "sideOffset", "children"];
function TooltipProvider(_ref) {
  var _ref$delayDuration = _ref.delayDuration,
    delayDuration = _ref$delayDuration === void 0 ? 0 : _ref$delayDuration,
    props = _objectWithoutProperties(_ref, _excluded$j);
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Provider, _extends({
    "data-slot": "tooltip-provider",
    delayDuration: delayDuration
  }, props));
}
function Tooltip(_ref2) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  return /*#__PURE__*/React__namespace.createElement(TooltipProvider, null, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Root, _extends({
    "data-slot": "tooltip"
  }, props)));
}
function TooltipTrigger(_ref3) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Trigger, _extends({
    "data-slot": "tooltip-trigger"
  }, props));
}
function TooltipContent(_ref4) {
  var className = _ref4.className,
    _ref4$sideOffset = _ref4.sideOffset,
    sideOffset = _ref4$sideOffset === void 0 ? 0 : _ref4$sideOffset,
    children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded2$a);
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Content, _extends({
    "data-slot": "tooltip-content",
    sideOffset: sideOffset,
    className: cn("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Arrow, {
    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
  })));
}

var _excluded$i = ["defaultOpen", "open", "onOpenChange", "className", "style", "children"],
  _excluded2$9 = ["side", "variant", "collapsible", "className", "children"],
  _excluded3$7 = ["className", "onClick"],
  _excluded4$5 = ["className"],
  _excluded5$3 = ["className"],
  _excluded6$3 = ["className"],
  _excluded7$2 = ["className"],
  _excluded8$2 = ["className"],
  _excluded9$1 = ["className"],
  _excluded10$1 = ["className"],
  _excluded11$1 = ["className"],
  _excluded12$1 = ["className", "asChild"],
  _excluded13$1 = ["className", "asChild"],
  _excluded14$1 = ["className"],
  _excluded15$1 = ["className"],
  _excluded16$1 = ["className"],
  _excluded17$1 = ["asChild", "isActive", "variant", "size", "tooltip", "className"],
  _excluded18$1 = ["className", "asChild", "showOnHover"],
  _excluded19$1 = ["className"],
  _excluded20$1 = ["className", "showIcon"],
  _excluded21 = ["className"],
  _excluded22 = ["className"],
  _excluded23 = ["asChild", "size", "isActive", "className"];
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = /*#__PURE__*/React__namespace.createContext(null);
function useSidebar() {
  var context = React__namespace.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider(_ref) {
  var _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? true : _ref$defaultOpen,
    openProp = _ref.open,
    setOpenProp = _ref.onOpenChange,
    className = _ref.className,
    style = _ref.style,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$i);
  var isMobile = useIsMobile$1();
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    openMobile = _React$useState2[0],
    setOpenMobile = _React$useState2[1];

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  var _React$useState3 = React__namespace.useState(defaultOpen),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    _open = _React$useState4[0],
    _setOpen = _React$useState4[1];
  var open = openProp !== null && openProp !== void 0 ? openProp : _open;
  var setOpen = React__namespace.useCallback(function (value) {
    var openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = "".concat(SIDEBAR_COOKIE_NAME, "=").concat(openState, "; path=/; max-age=").concat(SIDEBAR_COOKIE_MAX_AGE);
  }, [setOpenProp, open]);

  // Helper to toggle the sidebar.
  var toggleSidebar = React__namespace.useCallback(function () {
    return isMobile ? setOpenMobile(function (open) {
      return !open;
    }) : setOpen(function (open) {
      return !open;
    });
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React__namespace.useEffect(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  var state = open ? "expanded" : "collapsed";
  var contextValue = React__namespace.useMemo(function () {
    return {
      state: state,
      open: open,
      setOpen: setOpen,
      isMobile: isMobile,
      openMobile: openMobile,
      setOpenMobile: setOpenMobile,
      toggleSidebar: toggleSidebar
    };
  }, [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
  return /*#__PURE__*/React__namespace.createElement(SidebarContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React__namespace.createElement(TooltipProvider, {
    delayDuration: 0
  }, /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-wrapper",
    style: _objectSpread2({
      "--sidebar-width": SIDEBAR_WIDTH,
      "--sidebar-width-icon": SIDEBAR_WIDTH_ICON
    }, style),
    className: cn("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className)
  }, props), children)));
}
function Sidebar(_ref2) {
  var _ref2$side = _ref2.side,
    side = _ref2$side === void 0 ? "left" : _ref2$side,
    _ref2$variant = _ref2.variant,
    variant = _ref2$variant === void 0 ? "sidebar" : _ref2$variant,
    _ref2$collapsible = _ref2.collapsible,
    collapsible = _ref2$collapsible === void 0 ? "offcanvas" : _ref2$collapsible,
    className = _ref2.className,
    children = _ref2.children,
    props = _objectWithoutProperties(_ref2, _excluded2$9);
  var _useSidebar = useSidebar(),
    isMobile = _useSidebar.isMobile,
    state = _useSidebar.state,
    openMobile = _useSidebar.openMobile,
    setOpenMobile = _useSidebar.setOpenMobile;
  if (collapsible === "none") {
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      "data-slot": "sidebar",
      className: cn("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", className)
    }, props), children);
  }
  if (isMobile) {
    return /*#__PURE__*/React__namespace.createElement(Sheet, _extends({
      open: openMobile,
      onOpenChange: setOpenMobile
    }, props), /*#__PURE__*/React__namespace.createElement(SheetContent, {
      "data-sidebar": "sidebar",
      "data-slot": "sidebar",
      "data-mobile": "true",
      className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH_MOBILE
      },
      side: side
    }, /*#__PURE__*/React__namespace.createElement(SheetHeader, {
      className: "sr-only"
    }, /*#__PURE__*/React__namespace.createElement(SheetTitle, null, "Sidebar"), /*#__PURE__*/React__namespace.createElement(SheetDescription, null, "Displays the mobile sidebar.")), /*#__PURE__*/React__namespace.createElement("div", {
      className: "flex h-full w-full flex-col"
    }, children)));
  }
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "group peer text-sidebar-foreground hidden md:block",
    "data-state": state,
    "data-collapsible": state === "collapsed" ? collapsible : "",
    "data-variant": variant,
    "data-side": side,
    "data-slot": "sidebar"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    "data-slot": "sidebar-gap",
    className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
  }), /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-container",
    className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
    // Adjust the padding for floating and inset variants.
    variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className)
  }, props), /*#__PURE__*/React__namespace.createElement("div", {
    "data-sidebar": "sidebar",
    "data-slot": "sidebar-inner",
    className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
  }, children)));
}
function SidebarTrigger(_ref3) {
  var className = _ref3.className,
    _onClick = _ref3.onClick,
    props = _objectWithoutProperties(_ref3, _excluded3$7);
  var _useSidebar2 = useSidebar(),
    toggleSidebar = _useSidebar2.toggleSidebar;
  return /*#__PURE__*/React__namespace.createElement(Button, _extends({
    "data-sidebar": "trigger",
    "data-slot": "sidebar-trigger",
    variant: "ghost",
    size: "icon",
    className: cn("size-7", className),
    onClick: function onClick(event) {
      _onClick === null || _onClick === void 0 || _onClick(event);
      toggleSidebar();
    }
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.PanelLeftIcon, null), /*#__PURE__*/React__namespace.createElement("span", {
    className: "sr-only"
  }, "Toggle Sidebar"));
}
function SidebarRail(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$5);
  var _useSidebar3 = useSidebar(),
    toggleSidebar = _useSidebar3.toggleSidebar;
  return /*#__PURE__*/React__namespace.createElement("button", _extends({
    "data-sidebar": "rail",
    "data-slot": "sidebar-rail",
    "aria-label": "Toggle Sidebar",
    tabIndex: -1,
    onClick: toggleSidebar,
    title: "Toggle Sidebar",
    className: cn("hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className)
  }, props));
}
function SidebarInset(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5$3);
  return /*#__PURE__*/React__namespace.createElement("main", _extends({
    "data-slot": "sidebar-inset",
    className: cn("bg-background relative flex w-full flex-1 flex-col", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className)
  }, props));
}
function SidebarInput(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6$3);
  return /*#__PURE__*/React__namespace.createElement(Input, _extends({
    "data-slot": "sidebar-input",
    "data-sidebar": "input",
    className: cn("bg-background h-8 w-full shadow-none", className)
  }, props));
}
function SidebarHeader(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7$2);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-header",
    "data-sidebar": "header",
    className: cn("flex flex-col gap-2 p-2", className)
  }, props));
}
function SidebarFooter(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded8$2);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-footer",
    "data-sidebar": "footer",
    className: cn("flex flex-col gap-2 p-2", className)
  }, props));
}
function SidebarSeparator(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded9$1);
  return /*#__PURE__*/React__namespace.createElement(Separator, _extends({
    "data-slot": "sidebar-separator",
    "data-sidebar": "separator",
    className: cn("bg-sidebar-border mx-2 w-auto", className)
  }, props));
}
function SidebarContent(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded10$1);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-content",
    "data-sidebar": "content",
    className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)
  }, props));
}
function SidebarGroup(_ref11) {
  var className = _ref11.className,
    props = _objectWithoutProperties(_ref11, _excluded11$1);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-group",
    "data-sidebar": "group",
    className: cn("relative flex w-full min-w-0 flex-col p-2", className)
  }, props));
}
function SidebarGroupLabel(_ref12) {
  var className = _ref12.className,
    _ref12$asChild = _ref12.asChild,
    asChild = _ref12$asChild === void 0 ? false : _ref12$asChild,
    props = _objectWithoutProperties(_ref12, _excluded12$1);
  var Comp = asChild ? reactSlot.Slot : "div";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
    className: cn("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className)
  }, props));
}
function SidebarGroupAction(_ref13) {
  var className = _ref13.className,
    _ref13$asChild = _ref13.asChild,
    asChild = _ref13$asChild === void 0 ? false : _ref13$asChild,
    props = _objectWithoutProperties(_ref13, _excluded13$1);
  var Comp = asChild ? reactSlot.Slot : "button";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
    className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    // Increases the hit area of the button on mobile.
    "after:absolute after:-inset-2 md:after:hidden", "group-data-[collapsible=icon]:hidden", className)
  }, props));
}
function SidebarGroupContent(_ref14) {
  var className = _ref14.className,
    props = _objectWithoutProperties(_ref14, _excluded14$1);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-group-content",
    "data-sidebar": "group-content",
    className: cn("w-full text-sm", className)
  }, props));
}
function SidebarMenu(_ref15) {
  var className = _ref15.className,
    props = _objectWithoutProperties(_ref15, _excluded15$1);
  return /*#__PURE__*/React__namespace.createElement("ul", _extends({
    "data-slot": "sidebar-menu",
    "data-sidebar": "menu",
    className: cn("flex w-full min-w-0 flex-col gap-1", className)
  }, props));
}
function SidebarMenuItem(_ref16) {
  var className = _ref16.className,
    props = _objectWithoutProperties(_ref16, _excluded16$1);
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    "data-slot": "sidebar-menu-item",
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className)
  }, props));
}
var sidebarMenuButtonVariants = classVarianceAuthority.cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
  variants: {
    variant: {
      "default": "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
    },
    size: {
      "default": "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function SidebarMenuButton(_ref17) {
  var _ref17$asChild = _ref17.asChild,
    asChild = _ref17$asChild === void 0 ? false : _ref17$asChild,
    _ref17$isActive = _ref17.isActive,
    isActive = _ref17$isActive === void 0 ? false : _ref17$isActive,
    _ref17$variant = _ref17.variant,
    variant = _ref17$variant === void 0 ? "default" : _ref17$variant,
    _ref17$size = _ref17.size,
    size = _ref17$size === void 0 ? "default" : _ref17$size,
    tooltip = _ref17.tooltip,
    className = _ref17.className,
    props = _objectWithoutProperties(_ref17, _excluded17$1);
  var Comp = asChild ? reactSlot.Slot : "button";
  var _useSidebar4 = useSidebar(),
    isMobile = _useSidebar4.isMobile,
    state = _useSidebar4.state;
  var button = /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-active": isActive,
    className: cn(sidebarMenuButtonVariants({
      variant: variant,
      size: size
    }), className)
  }, props));
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /*#__PURE__*/React__namespace.createElement(Tooltip, null, /*#__PURE__*/React__namespace.createElement(TooltipTrigger, {
    asChild: true
  }, button), /*#__PURE__*/React__namespace.createElement(TooltipContent, _extends({
    side: "right",
    align: "center",
    hidden: state !== "collapsed" || isMobile
  }, tooltip)));
}
function SidebarMenuAction(_ref18) {
  var className = _ref18.className,
    _ref18$asChild = _ref18.asChild,
    asChild = _ref18$asChild === void 0 ? false : _ref18$asChild,
    _ref18$showOnHover = _ref18.showOnHover,
    showOnHover = _ref18$showOnHover === void 0 ? false : _ref18$showOnHover,
    props = _objectWithoutProperties(_ref18, _excluded18$1);
  var Comp = asChild ? reactSlot.Slot : "button";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
    className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    // Increases the hit area of the button on mobile.
    "after:absolute after:-inset-2 md:after:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0", className)
  }, props));
}
function SidebarMenuBadge(_ref19) {
  var className = _ref19.className,
    props = _objectWithoutProperties(_ref19, _excluded19$1);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-menu-badge",
    "data-sidebar": "menu-badge",
    className: cn("text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className)
  }, props));
}
function SidebarMenuSkeleton(_ref20) {
  var className = _ref20.className,
    _ref20$showIcon = _ref20.showIcon,
    showIcon = _ref20$showIcon === void 0 ? false : _ref20$showIcon,
    props = _objectWithoutProperties(_ref20, _excluded20$1);
  // Random width between 50 to 90%.
  var width = React__namespace.useMemo(function () {
    return "".concat(Math.floor(Math.random() * 40) + 50, "%");
  }, []);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    "data-slot": "sidebar-menu-skeleton",
    "data-sidebar": "menu-skeleton",
    className: cn("flex h-8 items-center gap-2 rounded-md px-2", className)
  }, props), showIcon && /*#__PURE__*/React__namespace.createElement(Skeleton, {
    className: "size-4 rounded-md",
    "data-sidebar": "menu-skeleton-icon"
  }), /*#__PURE__*/React__namespace.createElement(Skeleton, {
    className: "h-4 max-w-(--skeleton-width) flex-1",
    "data-sidebar": "menu-skeleton-text",
    style: {
      "--skeleton-width": width
    }
  }));
}
function SidebarMenuSub(_ref21) {
  var className = _ref21.className,
    props = _objectWithoutProperties(_ref21, _excluded21);
  return /*#__PURE__*/React__namespace.createElement("ul", _extends({
    "data-slot": "sidebar-menu-sub",
    "data-sidebar": "menu-sub",
    className: cn("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className)
  }, props));
}
function SidebarMenuSubItem(_ref22) {
  var className = _ref22.className,
    props = _objectWithoutProperties(_ref22, _excluded22);
  return /*#__PURE__*/React__namespace.createElement("li", _extends({
    "data-slot": "sidebar-menu-sub-item",
    "data-sidebar": "menu-sub-item",
    className: cn("group/menu-sub-item relative", className)
  }, props));
}
function SidebarMenuSubButton(_ref23) {
  var _ref23$asChild = _ref23.asChild,
    asChild = _ref23$asChild === void 0 ? false : _ref23$asChild,
    _ref23$size = _ref23.size,
    size = _ref23$size === void 0 ? "md" : _ref23$size,
    _ref23$isActive = _ref23.isActive,
    isActive = _ref23$isActive === void 0 ? false : _ref23$isActive,
    className = _ref23.className,
    props = _objectWithoutProperties(_ref23, _excluded23);
  var Comp = asChild ? reactSlot.Slot : "a";
  return /*#__PURE__*/React__namespace.createElement(Comp, _extends({
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-active": isActive,
    className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className)
  }, props));
}

var _excluded$h = ["className", "defaultValue", "value", "min", "max"];
function Slider(_ref) {
  var className = _ref.className,
    defaultValue = _ref.defaultValue,
    value = _ref.value,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    props = _objectWithoutProperties(_ref, _excluded$h);
  var _values = React__namespace.useMemo(function () {
    return Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];
  }, [value, defaultValue, min, max]);
  return /*#__PURE__*/React__namespace.createElement(SliderPrimitive__namespace.Root, _extends({
    "data-slot": "slider",
    defaultValue: defaultValue,
    value: value,
    min: min,
    max: max,
    className: cn("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className)
  }, props), /*#__PURE__*/React__namespace.createElement(SliderPrimitive__namespace.Track, {
    "data-slot": "slider-track",
    className: cn("bg-muted relative grow overflow-hidden rounded-[0px] data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2")
  }, /*#__PURE__*/React__namespace.createElement(SliderPrimitive__namespace.Range, {
    "data-slot": "slider-range",
    className: cn("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
  })), Array.from({
    length: _values.length
  }, function (_, index) {
    return /*#__PURE__*/React__namespace.createElement(SliderPrimitive__namespace.Thumb, {
      "data-slot": "slider-thumb",
      key: index,
      className: "border-primary bg-background ring-ring/50 block size-5 shrink-0 rounded-[0px] border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    });
  }));
}

var Toaster = function Toaster(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useTheme = nextThemes.useTheme(),
    _useTheme$theme = _useTheme.theme,
    theme = _useTheme$theme === void 0 ? "system" : _useTheme$theme;
  return /*#__PURE__*/React.createElement(sonner.Toaster, _extends({
    theme: theme,
    className: "toaster group",
    style: {
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)"
    }
  }, props));
};

var _excluded$g = ["className"];
var Switch = /*#__PURE__*/React__namespace.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$g);
  return /*#__PURE__*/React__namespace.createElement(SwitchPrimitives__namespace.Root, _extends({
    className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className)
  }, props, {
    ref: ref
  }), /*#__PURE__*/React__namespace.createElement(SwitchPrimitives__namespace.Thumb, {
    className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
  }));
});
Switch.displayName = SwitchPrimitives__namespace.Root.displayName;

var _excluded$f = ["className"],
  _excluded2$8 = ["className"],
  _excluded3$6 = ["className"],
  _excluded4$4 = ["className"],
  _excluded5$2 = ["className"],
  _excluded6$2 = ["className"],
  _excluded7$1 = ["className"],
  _excluded8$1 = ["className"];
function Table(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$f);
  return /*#__PURE__*/React__namespace.createElement("div", {
    "data-slot": "table-container",
    className: "relative w-full overflow-x-auto"
  }, /*#__PURE__*/React__namespace.createElement("table", _extends({
    "data-slot": "table",
    className: cn("w-full caption-bottom text-sm", className)
  }, props)));
}
function TableHeader(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$8);
  return /*#__PURE__*/React__namespace.createElement("thead", _extends({
    "data-slot": "table-header",
    className: cn("[&_tr]:border-b", className)
  }, props));
}
function TableBody(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$6);
  return /*#__PURE__*/React__namespace.createElement("tbody", _extends({
    "data-slot": "table-body",
    className: cn("[&_tr:last-child]:border-0", className)
  }, props));
}
function TableFooter(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$4);
  return /*#__PURE__*/React__namespace.createElement("tfoot", _extends({
    "data-slot": "table-footer",
    className: cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)
  }, props));
}
function TableRow(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5$2);
  return /*#__PURE__*/React__namespace.createElement("tr", _extends({
    "data-slot": "table-row",
    className: cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)
  }, props));
}
function TableHead(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6$2);
  return /*#__PURE__*/React__namespace.createElement("th", _extends({
    "data-slot": "table-head",
    className: cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
}
function TableCell(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7$1);
  return /*#__PURE__*/React__namespace.createElement("td", _extends({
    "data-slot": "table-cell",
    className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
}
function TableCaption(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded8$1);
  return /*#__PURE__*/React__namespace.createElement("caption", _extends({
    "data-slot": "table-caption",
    className: cn("text-muted-foreground mt-4 text-sm", className)
  }, props));
}

var _excluded$e = ["className"],
  _excluded2$7 = ["className"],
  _excluded3$5 = ["className"],
  _excluded4$3 = ["className"];
function Tabs(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$e);
  return /*#__PURE__*/React__namespace.createElement(TabsPrimitive__namespace.Root, _extends({
    "data-slot": "tabs",
    className: cn("flex flex-col gap-2", className)
  }, props));
}
function TabsList(_ref2) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$7);
  return /*#__PURE__*/React__namespace.createElement(TabsPrimitive__namespace.List, _extends({
    "data-slot": "tabs-list",
    className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className)
  }, props));
}
function TabsTrigger(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$5);
  return /*#__PURE__*/React__namespace.createElement(TabsPrimitive__namespace.Trigger, _extends({
    "data-slot": "tabs-trigger",
    className: cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function TabsContent(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$3);
  return /*#__PURE__*/React__namespace.createElement(TabsPrimitive__namespace.Content, _extends({
    "data-slot": "tabs-content",
    className: cn("flex-1 outline-none", className)
  }, props));
}

var _excluded$d = ["className"];
function Textarea(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$d);
  return /*#__PURE__*/React__namespace.createElement("textarea", _extends({
    "data-slot": "textarea",
    className: cn("border-input bg-transparent placeholder:text-muted-foreground", "w-full px-3 py-2 text-base shadow-xs outline-none", "border rounded-[0px] min-h-[80px]", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 aria-invalid:border-destructive", "disabled:cursor-not-allowed disabled:opacity-50", "hover:border-foreground", "transition-[color,box-shadow]", "font-calibre resize-vertical", className)
  }, props));
}

var _excluded$c = ["className", "variant", "size"];
var toggleVariants = classVarianceAuthority.cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", {
  variants: {
    variant: {
      "default": "bg-transparent",
      outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      "default": "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Toggle(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    props = _objectWithoutProperties(_ref, _excluded$c);
  return /*#__PURE__*/React__namespace.createElement(TogglePrimitive__namespace.Root, _extends({
    "data-slot": "toggle",
    className: cn(toggleVariants({
      variant: variant,
      size: size,
      className: className
    }))
  }, props));
}

var _excluded$b = ["className", "variant", "size", "children"],
  _excluded2$6 = ["className", "children", "variant", "size"];
var ToggleGroupContext = /*#__PURE__*/React__namespace.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$b);
  return /*#__PURE__*/React__namespace.createElement(ToggleGroupPrimitive__namespace.Root, _extends({
    "data-slot": "toggle-group",
    "data-variant": variant,
    "data-size": size,
    className: cn("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", className)
  }, props), /*#__PURE__*/React__namespace.createElement(ToggleGroupContext.Provider, {
    value: {
      variant: variant,
      size: size
    }
  }, children));
}
function ToggleGroupItem(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    variant = _ref2.variant,
    size = _ref2.size,
    props = _objectWithoutProperties(_ref2, _excluded2$6);
  var context = React__namespace.useContext(ToggleGroupContext);
  return /*#__PURE__*/React__namespace.createElement(ToggleGroupPrimitive__namespace.Item, _extends({
    "data-slot": "toggle-group-item",
    "data-variant": context.variant || variant,
    "data-size": context.size || size,
    className: cn(toggleVariants({
      variant: context.variant || variant,
      size: context.size || size
    }), "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className)
  }, props), children);
}

/**
 * UI Components Barrel Export
 * This file exports all UI components to simplify imports
 */

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Accordion: Accordion,
  AccordionContent: AccordionContent,
  AccordionItem: AccordionItem,
  AccordionTrigger: AccordionTrigger,
  Alert: Alert,
  AlertDescription: AlertDescription,
  AlertDialog: AlertDialog,
  AlertDialogAction: AlertDialogAction,
  AlertDialogCancel: AlertDialogCancel,
  AlertDialogContent: AlertDialogContent,
  AlertDialogDescription: AlertDialogDescription,
  AlertDialogFooter: AlertDialogFooter,
  AlertDialogHeader: AlertDialogHeader,
  AlertDialogOverlay: AlertDialogOverlay,
  AlertDialogPortal: AlertDialogPortal,
  AlertDialogTitle: AlertDialogTitle,
  AlertDialogTrigger: AlertDialogTrigger,
  AlertTitle: AlertTitle,
  Avatar: Avatar,
  AvatarFallback: AvatarFallback,
  AvatarImage: AvatarImage,
  Badge: Badge,
  Breadcrumb: Breadcrumb,
  BreadcrumbEllipsis: BreadcrumbEllipsis,
  BreadcrumbItem: BreadcrumbItem,
  BreadcrumbLink: BreadcrumbLink,
  BreadcrumbList: BreadcrumbList,
  BreadcrumbPage: BreadcrumbPage,
  BreadcrumbSeparator: BreadcrumbSeparator,
  Button: Button,
  Calendar: Calendar,
  Card: Card,
  CardAction: CardAction,
  CardContent: CardContent,
  CardDescription: CardDescription,
  CardFooter: CardFooter,
  CardHeader: CardHeader,
  CardTitle: CardTitle,
  Carousel: Carousel,
  CarouselContent: CarouselContent,
  CarouselItem: CarouselItem,
  CarouselNext: CarouselNext,
  CarouselPrevious: CarouselPrevious,
  Checkbox: Checkbox,
  Dialog: Dialog,
  DialogClose: DialogClose,
  DialogContent: DialogContent,
  DialogDescription: DialogDescription,
  DialogFooter: DialogFooter,
  DialogHeader: DialogHeader,
  DialogOverlay: DialogOverlay,
  DialogPortal: DialogPortal,
  DialogTitle: DialogTitle,
  DialogTrigger: DialogTrigger,
  DropdownMenu: DropdownMenu,
  DropdownMenuCheckboxItem: DropdownMenuCheckboxItem,
  DropdownMenuContent: DropdownMenuContent,
  DropdownMenuGroup: DropdownMenuGroup,
  DropdownMenuItem: DropdownMenuItem,
  DropdownMenuLabel: DropdownMenuLabel,
  DropdownMenuPortal: DropdownMenuPortal,
  DropdownMenuRadioGroup: DropdownMenuRadioGroup,
  DropdownMenuRadioItem: DropdownMenuRadioItem,
  DropdownMenuSeparator: DropdownMenuSeparator,
  DropdownMenuShortcut: DropdownMenuShortcut,
  DropdownMenuSub: DropdownMenuSub,
  DropdownMenuSubContent: DropdownMenuSubContent,
  DropdownMenuSubTrigger: DropdownMenuSubTrigger,
  DropdownMenuTrigger: DropdownMenuTrigger,
  Form: Form,
  FormControl: FormControl,
  FormDescription: FormDescription,
  FormField: FormField,
  FormItem: FormItem,
  FormLabel: FormLabel,
  FormMessage: FormMessage,
  HoverCard: HoverCard,
  HoverCardContent: HoverCardContent,
  HoverCardTrigger: HoverCardTrigger,
  Input: Input,
  Label: Label,
  Menubar: Menubar,
  MenubarCheckboxItem: MenubarCheckboxItem,
  MenubarContent: MenubarContent,
  MenubarGroup: MenubarGroup,
  MenubarItem: MenubarItem,
  MenubarLabel: MenubarLabel,
  MenubarMenu: MenubarMenu,
  MenubarPortal: MenubarPortal,
  MenubarRadioGroup: MenubarRadioGroup,
  MenubarRadioItem: MenubarRadioItem,
  MenubarSeparator: MenubarSeparator,
  MenubarShortcut: MenubarShortcut,
  MenubarSub: MenubarSub,
  MenubarSubContent: MenubarSubContent,
  MenubarSubTrigger: MenubarSubTrigger,
  MenubarTrigger: MenubarTrigger,
  NavigationMenu: NavigationMenu,
  NavigationMenuContent: NavigationMenuContent,
  NavigationMenuIndicator: NavigationMenuIndicator,
  NavigationMenuItem: NavigationMenuItem,
  NavigationMenuLink: NavigationMenuLink,
  NavigationMenuList: NavigationMenuList,
  NavigationMenuTrigger: NavigationMenuTrigger,
  NavigationMenuViewport: NavigationMenuViewport,
  Pagination: Pagination,
  PaginationContent: PaginationContent,
  PaginationEllipsis: PaginationEllipsis,
  PaginationItem: PaginationItem,
  PaginationLink: PaginationLink,
  PaginationNext: PaginationNext,
  PaginationPrevious: PaginationPrevious,
  Popover: Popover,
  PopoverAnchor: PopoverAnchor,
  PopoverContent: PopoverContent,
  PopoverTrigger: PopoverTrigger,
  ResizableHandle: ResizableHandle,
  ResizablePanel: ResizablePanel,
  ResizablePanelGroup: ResizablePanelGroup,
  ScrollArea: ScrollArea,
  ScrollBar: ScrollBar,
  Select: Select,
  SelectContent: SelectContent,
  SelectGroup: SelectGroup,
  SelectItem: SelectItem,
  SelectLabel: SelectLabel,
  SelectScrollDownButton: SelectScrollDownButton,
  SelectScrollUpButton: SelectScrollUpButton,
  SelectSeparator: SelectSeparator,
  SelectTrigger: SelectTrigger,
  SelectValue: SelectValue,
  Separator: Separator,
  Sheet: Sheet,
  SheetClose: SheetClose,
  SheetContent: SheetContent,
  SheetDescription: SheetDescription,
  SheetFooter: SheetFooter,
  SheetHeader: SheetHeader,
  SheetTitle: SheetTitle,
  SheetTrigger: SheetTrigger,
  Sidebar: Sidebar,
  SidebarContent: SidebarContent,
  SidebarFooter: SidebarFooter,
  SidebarGroup: SidebarGroup,
  SidebarGroupAction: SidebarGroupAction,
  SidebarGroupContent: SidebarGroupContent,
  SidebarGroupLabel: SidebarGroupLabel,
  SidebarHeader: SidebarHeader,
  SidebarInput: SidebarInput,
  SidebarInset: SidebarInset,
  SidebarMenu: SidebarMenu,
  SidebarMenuAction: SidebarMenuAction,
  SidebarMenuBadge: SidebarMenuBadge,
  SidebarMenuButton: SidebarMenuButton,
  SidebarMenuItem: SidebarMenuItem,
  SidebarMenuSkeleton: SidebarMenuSkeleton,
  SidebarMenuSub: SidebarMenuSub,
  SidebarMenuSubButton: SidebarMenuSubButton,
  SidebarMenuSubItem: SidebarMenuSubItem,
  SidebarProvider: SidebarProvider,
  SidebarRail: SidebarRail,
  SidebarSeparator: SidebarSeparator,
  SidebarTrigger: SidebarTrigger,
  Skeleton: Skeleton,
  Slider: Slider,
  Switch: Switch,
  Table: Table,
  TableBody: TableBody,
  TableCaption: TableCaption,
  TableCell: TableCell,
  TableFooter: TableFooter,
  TableHead: TableHead,
  TableHeader: TableHeader,
  TableRow: TableRow,
  Tabs: Tabs,
  TabsContent: TabsContent,
  TabsList: TabsList,
  TabsTrigger: TabsTrigger,
  Textarea: Textarea,
  Toaster: Toaster,
  Toggle: Toggle,
  ToggleGroup: ToggleGroup,
  ToggleGroupItem: ToggleGroupItem,
  Tooltip: Tooltip,
  TooltipContent: TooltipContent,
  TooltipProvider: TooltipProvider,
  TooltipTrigger: TooltipTrigger,
  badgeVariants: badgeVariants$1,
  buttonVariants: buttonVariants,
  navigationMenuTriggerStyle: navigationMenuTriggerStyle,
  toggleVariants: toggleVariants,
  useFormField: useFormField,
  useSidebar: useSidebar
});

/**
 * CBREAccordion - A styled accordion component following CBRE design
 * 
 * Features:
 * - CBRE green text for headers
 * - Top and bottom borders for each item
 * - Custom arrow icon with CBRE styling
 */
function CBREAccordion(_ref) {
  var items = _ref.items,
    className = _ref.className,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "single" : _ref$type,
    defaultValue = _ref.defaultValue,
    _ref$collapsible = _ref.collapsible,
    collapsible = _ref$collapsible === void 0 ? true : _ref$collapsible;
  // Generate default values if none provided
  var defaultVal = defaultValue || (type === "single" ? "item-0" : undefined);
  return /*#__PURE__*/React$1.createElement("div", {
    className: cn("w-full", className)
  }, type === "single" ? /*#__PURE__*/React$1.createElement(Accordion, {
    type: "single",
    defaultValue: defaultVal,
    collapsible: collapsible,
    className: "w-full"
  }, items.map(function (item, index) {
    return /*#__PURE__*/React$1.createElement(AccordionItem, {
      key: "item-".concat(index),
      value: "item-".concat(index),
      className: "border-t border-b border-[#CAD1D3] py-0"
    }, /*#__PURE__*/React$1.createElement(AccordionTrigger, {
      className: "text-[#003F2D] font-financier text-xl md:text-2xl py-5 hover:no-underline"
    }, item.title), /*#__PURE__*/React$1.createElement(AccordionContent, {
      className: "font-calibre text-[#435254]"
    }, item.content));
  })) : /*#__PURE__*/React$1.createElement(Accordion, {
    type: "multiple",
    defaultValue: defaultVal,
    className: "w-full"
  }, items.map(function (item, index) {
    return /*#__PURE__*/React$1.createElement(AccordionItem, {
      key: "item-".concat(index),
      value: "item-".concat(index),
      className: "border-t border-b border-[#CAD1D3] py-0"
    }, /*#__PURE__*/React$1.createElement(AccordionTrigger, {
      className: "text-[#003F2D] font-financier text-xl md:text-2xl py-5 hover:no-underline"
    }, item.title), /*#__PURE__*/React$1.createElement(AccordionContent, {
      className: "font-calibre text-[#435254]"
    }, item.content));
  })));
}

/**
 * CBREArrowButton
 * 
 * A custom button that displays "-- Text" by default, and transforms to "Text -->"
 * on hover, following CBRE's design language.
 */
var CBREArrowButton = function CBREArrowButton(_ref) {
  var children = _ref.children,
    href = _ref.href,
    className = _ref.className,
    onClick = _ref.onClick;
  var _useState = React$1.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isHovered = _useState2[0],
    setIsHovered = _useState2[1];
  var content = /*#__PURE__*/React$1.createElement("div", {
    className: cn("group inline-flex items-center relative h-5", className),
    onMouseEnter: function onMouseEnter() {
      return setIsHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovered(false);
    },
    onClick: onClick
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "w-5 h-5 relative mr-2"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: cn("absolute inset-0 transition-transform duration-300 ease-in-out", isHovered ? "transform -translate-x-2 opacity-0" : "transform translate-x-0 opacity-100")
  }, /*#__PURE__*/React$1.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "10",
    x2: "16",
    y2: "10",
    stroke: "#17E88F",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React$1.createElement("span", {
    className: cn("text-primary font-calibre font-medium transition-transform duration-300 ease-in-out", isHovered ? "transform -translate-x-7" : "transform translate-x-0")
  }, children), /*#__PURE__*/React$1.createElement("div", {
    className: cn("w-5 h-5 relative transition-all duration-300 ease-in-out", isHovered ? "ml-[-15px]" : "ml-2")
  }, /*#__PURE__*/React$1.createElement("div", {
    className: cn("absolute inset-0 transition-transform duration-300 ease-in-out", isHovered ? "transform translate-x-0 opacity-100" : "transform translate-x-2 opacity-0")
  }, /*#__PURE__*/React$1.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "2",
    y1: "10",
    x2: "12",
    y2: "10",
    stroke: "#17E88F",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M10 6L14 10L10 14",
    stroke: "#17E88F",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
  if (href) {
    return /*#__PURE__*/React$1.createElement("a", {
      href: href,
      className: "inline-block"
    }, content);
  }
  return content;
};

var _excluded$a = ["className", "variant", "size"];
var badgeVariants = classVarianceAuthority.cva("inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      "default": "border-transparent bg-[var(--cbre-green)] text-white hover:bg-[var(--cbre-green)]/80",
      success: "border-transparent bg-[var(--accent-green)] text-[var(--dark-green)] hover:bg-[var(--accent-green)]/80",
      warning: "border-transparent bg-[var(--wheat)] text-[var(--dark-grey)] hover:bg-[var(--wheat)]/80",
      error: "border-transparent bg-[var(--negative-red)] text-white hover:bg-[var(--negative-red)]/80",
      info: "border-transparent bg-[var(--celadon)] text-[var(--dark-grey)] hover:bg-[var(--celadon)]/80",
      outline: "border-[var(--cbre-green)] text-[var(--cbre-green)] hover:bg-[var(--cbre-green)]/10",
      secondary: "border-transparent bg-[var(--lighter-grey)] text-[var(--dark-grey)] hover:bg-[var(--lighter-grey)]/80"
    },
    size: {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
      lg: "text-base px-3 py-1.5"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
function CBREBadge(_ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    props = _objectWithoutProperties(_ref, _excluded$a);
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    className: cn(badgeVariants({
      variant: variant,
      size: size
    }), className)
  }, props));
}

var _excluded$9 = ["className", "variant", "children", "onClick"];
/**
 * CBREButton - A button component styled according to CBRE brand guidelines
 * 
 * This component demonstrates proper theming and styling for CBRE branded buttons
 * using shadcn/ui Button component as a foundation.
 */
function CBREButton(_ref) {
  var className = _ref.className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "primary" : _ref$variant,
    children = _ref.children,
    onClick = _ref.onClick,
    props = _objectWithoutProperties(_ref, _excluded$9);
  // Special case for text variant - render as a span to avoid button styling
  if (variant === "text") {
    return /*#__PURE__*/React$1.createElement("span", _extends({
      onClick: onClick,
      className: cn("cursor-pointer inline-block text-[#003F2D] underline decoration-[#003F2D] underline-offset-4 hover:decoration-[#17E88F] transition-colors duration-300", className)
    }, props), children);
  }

  // Map CBRE-specific variants to shadcn/ui variants with appropriate styling
  var getButtonStyles = function getButtonStyles() {
    switch (variant) {
      case "primary":
        return cn("bg-[#003F2D] text-white hover:bg-[#17E88F] hover:text-[#003F2D] transition-colors duration-300 font-medium", className);
      case "outline":
        return cn("border border-cbre-green text-cbre-green", "hover:bg-[rgba(230,232,233,0.2)] hover:border-cbre-green", "transition-colors duration-300", className);
      case "accent":
        return cn("bg-[#17E88F] text-[#003F2D] hover:bg-[#003F2D] hover:text-white transition-colors duration-300 font-medium", className);
      case "action":
        return cn("bg-[#538184] text-white hover:bg-[#96B3B6] hover:text-[#012A2D] transition-colors duration-300 px-6 py-2 font-medium text-sm", className);
      case "view-more":
        // Fixed styling to match the design exactly - using actual hex values for reliability
        return cn("bg-[#012A2D] text-white hover:bg-[#17E88F] hover:text-[#003F2D] transition-colors duration-300 font-calibre font-medium px-6 py-2.5", className);
      default:
        return className;
    }
  };

  // Map to shadcn/ui variants
  var getShadcnVariant = function getShadcnVariant() {
    switch (variant) {
      case "primary":
        return "default";
      case "outline":
        return "outline";
      case "accent":
      case "action":
      case "view-more":
        return "default";
      default:
        return "default";
    }
  };
  return /*#__PURE__*/React$1.createElement(Button, _extends({
    className: getButtonStyles(),
    variant: getShadcnVariant(),
    onClick: onClick
  }, props), children);
}

var _excluded$8 = ["children", "className", "variant"],
  _excluded2$5 = ["children", "className"],
  _excluded3$4 = ["children", "className"],
  _excluded4$2 = ["children", "className"],
  _excluded5$1 = ["children", "className"],
  _excluded6$1 = ["children", "className"];
/**
 * CBRECard - A styled card component following CBRE design
 * 
 * Features:
 * - CBRE styled card with consistent spacing
 * - Sharp corners (no border radius)
 * - Three variants: default, outline, and secondary
 */
function CBRECard(_ref) {
  var children = _ref.children,
    className = _ref.className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "default" : _ref$variant,
    props = _objectWithoutProperties(_ref, _excluded$8);
  // Variant styles
  var variantClasses = {
    "default": "bg-white border border-light-grey shadow-sm",
    outline: "bg-white border border-light-grey shadow-none",
    secondary: "bg-[var(--lighter-grey)] border-none shadow-none"
  };
  return /*#__PURE__*/React$1.createElement(Card, _extends({
    className: cn(
    // Remove rounded corners
    "rounded-none",
    // Apply variant-specific styles
    variantClasses[variant],
    // Custom spacing
    "py-6", className)
  }, props), children);
}
function CBRECardHeader(_ref2) {
  var children = _ref2.children,
    className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2$5);
  return /*#__PURE__*/React$1.createElement(CardHeader, _extends({
    className: cn("px-6", className)
  }, props), children);
}
function CBRECardTitle(_ref3) {
  var children = _ref3.children,
    className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$4);
  return /*#__PURE__*/React$1.createElement(CardTitle, _extends({
    className: cn("text-xl font-financier text-cbre-green", className)
  }, props), children);
}
function CBRECardDescription(_ref4) {
  var children = _ref4.children,
    className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$2);
  return /*#__PURE__*/React$1.createElement(CardDescription, _extends({
    className: cn("text-dark-grey font-calibre mt-1", className)
  }, props), children);
}
function CBRECardContent(_ref5) {
  var children = _ref5.children,
    className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5$1);
  return /*#__PURE__*/React$1.createElement(CardContent, _extends({
    className: cn("px-6 text-dark-grey font-calibre", className)
  }, props), children);
}
function CBRECardFooter(_ref6) {
  var children = _ref6.children,
    className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6$1);
  return /*#__PURE__*/React$1.createElement(CardFooter, _extends({
    className: cn("px-6 flex items-center justify-end gap-4", className)
  }, props), children);
}

// Chart Data Types

// CBRE Chart Colors using CSS variables
var chartConfig = {
  colors: ["var(--cbre-green)",
  // Primary
  "var(--accent-green)",
  // Secondary
  "var(--celadon)",
  // Tertiary
  "var(--wheat)",
  // Quaternary
  "var(--sage)",
  // Additional
  "var(--midnight)" // Additional
  ],
  axis: "var(--dark-grey)",
  grid: "var(--light-grey)",
  tooltip: {
    background: "var(--lighter-grey)",
    text: "var(--dark-grey)",
    border: "var(--light-grey)"
  }
};

// Chart Tooltip Component
function ChartTooltip(_ref) {
  var active = _ref.active,
    payload = _ref.payload,
    label = _ref.label,
    className = _ref.className;
  if (active && payload && payload.length) {
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: cn("border bg-[var(--lighter-grey)] p-2 shadow-sm", className),
      style: {
        border: "1px solid var(--light-grey)",
        color: "var(--dark-grey)"
      }
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "flex flex-col gap-1"
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: "text-[0.70rem] uppercase font-medium"
    }, label), payload.map(function (item, index) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: index,
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "w-2 h-2",
        style: {
          backgroundColor: item.fill || item.color
        }
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: "text-sm capitalize"
      }, item.dataKey, ":"), /*#__PURE__*/React__namespace.createElement("span", {
        className: "text-sm font-medium"
      }, "$", item.value));
    })));
  }
  return null;
}

// Bar Chart Component
function CBRESimpleBarChart(_ref2) {
  var data = _ref2.data,
    className = _ref2.className;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("w-full", className)
  }, /*#__PURE__*/React__namespace.createElement(recharts.ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React__namespace.createElement(recharts.BarChart, {
    data: data
  }, /*#__PURE__*/React__namespace.createElement(recharts.CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: chartConfig.grid,
    vertical: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.XAxis, {
    dataKey: "name",
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.YAxis, {
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    tickFormatter: function tickFormatter(value) {
      return "$".concat(value);
    }
  }), /*#__PURE__*/React__namespace.createElement(recharts.Tooltip, {
    content: /*#__PURE__*/React__namespace.createElement(ChartTooltip, null)
  }), /*#__PURE__*/React__namespace.createElement(recharts.Bar, {
    dataKey: "total",
    fill: "var(--cbre-green)",
    radius: [0, 0, 0, 0]
  }))));
}

// Line Chart Component
function CBRESimpleLineChart(_ref3) {
  var data = _ref3.data,
    className = _ref3.className;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("w-full", className)
  }, /*#__PURE__*/React__namespace.createElement(recharts.ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React__namespace.createElement(recharts.LineChart, {
    data: data
  }, /*#__PURE__*/React__namespace.createElement(recharts.CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: chartConfig.grid,
    vertical: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.XAxis, {
    dataKey: "name",
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.YAxis, {
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    tickFormatter: function tickFormatter(value) {
      return "$".concat(value);
    }
  }), /*#__PURE__*/React__namespace.createElement(recharts.Tooltip, {
    content: /*#__PURE__*/React__namespace.createElement(ChartTooltip, null)
  }), /*#__PURE__*/React__namespace.createElement(recharts.Line, {
    dataKey: "actual",
    stroke: "var(--cbre-green)",
    strokeWidth: 2,
    dot: true
  }), /*#__PURE__*/React__namespace.createElement(recharts.Line, {
    dataKey: "target",
    stroke: "var(--accent-green)",
    strokeWidth: 2,
    dot: true
  }))));
}

// Pie Chart Component
function CBRESimplePieChart(_ref4) {
  var data = _ref4.data,
    className = _ref4.className;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("w-full", className)
  }, /*#__PURE__*/React__namespace.createElement(recharts.ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React__namespace.createElement(recharts.PieChart, null, /*#__PURE__*/React__namespace.createElement(recharts.Pie, {
    data: data,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    outerRadius: 120,
    dataKey: "value",
    label: function label(_ref5) {
      var name = _ref5.name,
        percent = _ref5.percent;
      return "".concat(name, " ").concat((percent * 100).toFixed(0), "%");
    }
  }, data.map(function (_, index) {
    return /*#__PURE__*/React__namespace.createElement(recharts.Cell, {
      key: "cell-".concat(index),
      fill: chartConfig.colors[index % chartConfig.colors.length]
    });
  })), /*#__PURE__*/React__namespace.createElement(recharts.Tooltip, {
    content: /*#__PURE__*/React__namespace.createElement(ChartTooltip, null)
  }))));
}

// Horizontal Bar Chart Component
function CBREHorizontalBarChart(_ref6) {
  var data = _ref6.data,
    className = _ref6.className;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("w-full", className)
  }, /*#__PURE__*/React__namespace.createElement(recharts.ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React__namespace.createElement(recharts.BarChart, {
    layout: "vertical",
    data: data,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/React__namespace.createElement(recharts.CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: chartConfig.grid,
    horizontal: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.XAxis, {
    type: "number",
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    tickFormatter: function tickFormatter(value) {
      return "$".concat(value);
    }
  }), /*#__PURE__*/React__namespace.createElement(recharts.YAxis, {
    type: "category",
    dataKey: "name",
    stroke: chartConfig.axis,
    fontSize: 12,
    tickLine: false,
    axisLine: false
  }), /*#__PURE__*/React__namespace.createElement(recharts.Tooltip, {
    content: /*#__PURE__*/React__namespace.createElement(ChartTooltip, null)
  }), /*#__PURE__*/React__namespace.createElement(recharts.Bar, {
    dataKey: "actual",
    fill: "var(--celadon)",
    radius: [0, 0, 0, 0]
  }), /*#__PURE__*/React__namespace.createElement(recharts.Bar, {
    dataKey: "target",
    fill: "var(--wheat)",
    radius: [0, 0, 0, 0]
  }))));
}

/**
 * CBRECheckboxGroup - A group of checkboxes with a shared title
 */

function CBRECheckboxGroup(_ref) {
  var title = _ref.title,
    description = _ref.description,
    className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("space-y-4", className)
  }, (title || description) && /*#__PURE__*/React__namespace.createElement("div", {
    className: "mb-3"
  }, title && /*#__PURE__*/React__namespace.createElement("h3", {
    className: "text-xl font-financier text-cbre-green mb-2"
  }, title), description && /*#__PURE__*/React__namespace.createElement("p", {
    className: "text-dark-grey font-calibre text-sm"
  }, description)), /*#__PURE__*/React__namespace.createElement("div", {
    className: "space-y-3"
  }, children));
}

function CBREDataTable(_ref) {
  var _ref2, _table$getColumn, _table$getRowModel$ro;
  var columns = _ref.columns,
    data = _ref.data,
    searchKey = _ref.searchKey,
    _ref$showColumnVisibi = _ref.showColumnVisibility,
    showColumnVisibility = _ref$showColumnVisibi === void 0 ? true : _ref$showColumnVisibi,
    _ref$showGlobalFilter = _ref.showGlobalFilter,
    showGlobalFilter = _ref$showGlobalFilter === void 0 ? true : _ref$showGlobalFilter;
  var _React$useState = React__namespace.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sorting = _React$useState2[0],
    setSorting = _React$useState2[1];
  var _React$useState3 = React__namespace.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    columnFilters = _React$useState4[0],
    setColumnFilters = _React$useState4[1];
  var _React$useState5 = React__namespace.useState({}),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    columnVisibility = _React$useState6[0],
    setColumnVisibility = _React$useState6[1];
  var _React$useState7 = React__namespace.useState({}),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    rowSelection = _React$useState8[0],
    setRowSelection = _React$useState8[1];
  var table = reactTable.useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
      columnVisibility: columnVisibility,
      rowSelection: rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: reactTable.getCoreRowModel(),
    getFilteredRowModel: reactTable.getFilteredRowModel(),
    getPaginationRowModel: reactTable.getPaginationRowModel(),
    getSortedRowModel: reactTable.getSortedRowModel(),
    getFacetedRowModel: reactTable.getFacetedRowModel(),
    getFacetedUniqueValues: reactTable.getFacetedUniqueValues()
  });
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex items-center justify-between"
  }, showGlobalFilter && searchKey && /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex items-center py-4"
  }, /*#__PURE__*/React__namespace.createElement(Input, {
    placeholder: "Search...",
    value: (_ref2 = (_table$getColumn = table.getColumn(searchKey)) === null || _table$getColumn === void 0 ? void 0 : _table$getColumn.getFilterValue()) !== null && _ref2 !== void 0 ? _ref2 : "",
    onChange: function onChange(event) {
      var _table$getColumn2;
      return (_table$getColumn2 = table.getColumn(searchKey)) === null || _table$getColumn2 === void 0 ? void 0 : _table$getColumn2.setFilterValue(event.target.value);
    },
    className: "max-w-sm"
  })), showColumnVisibility && /*#__PURE__*/React__namespace.createElement(DropdownMenu, null, /*#__PURE__*/React__namespace.createElement(DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "outline",
    className: "ml-auto"
  }, "Columns ", /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDown, {
    className: "ml-2 h-4 w-4"
  }))), /*#__PURE__*/React__namespace.createElement(DropdownMenuContent, {
    align: "end"
  }, table.getAllColumns().filter(function (column) {
    return column.getCanHide();
  }).map(function (column) {
    return /*#__PURE__*/React__namespace.createElement(DropdownMenuCheckboxItem, {
      key: column.id,
      className: "capitalize",
      checked: column.getIsVisible(),
      onCheckedChange: function onCheckedChange(value) {
        return column.toggleVisibility(!!value);
      }
    }, column.id);
  })))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "rounded-md border"
  }, /*#__PURE__*/React__namespace.createElement(Table, null, /*#__PURE__*/React__namespace.createElement(TableHeader, null, table.getHeaderGroups().map(function (headerGroup) {
    return /*#__PURE__*/React__namespace.createElement(TableRow, {
      key: headerGroup.id
    }, headerGroup.headers.map(function (header) {
      return /*#__PURE__*/React__namespace.createElement(TableHead, {
        key: header.id
      }, header.isPlaceholder ? null : reactTable.flexRender(header.column.columnDef.header, header.getContext()));
    }));
  })), /*#__PURE__*/React__namespace.createElement(TableBody, null, (_table$getRowModel$ro = table.getRowModel().rows) !== null && _table$getRowModel$ro !== void 0 && _table$getRowModel$ro.length ? table.getRowModel().rows.map(function (row) {
    return /*#__PURE__*/React__namespace.createElement(TableRow, {
      key: row.id,
      "data-state": row.getIsSelected() && "selected"
    }, row.getVisibleCells().map(function (cell) {
      return /*#__PURE__*/React__namespace.createElement(TableCell, {
        key: cell.id
      }, reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()));
    }));
  }) : /*#__PURE__*/React__namespace.createElement(TableRow, null, /*#__PURE__*/React__namespace.createElement(TableCell, {
    colSpan: columns.length,
    className: "h-24 text-center text-muted-foreground"
  }, "No results."))))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex items-center justify-end space-x-2 py-4"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex-1 text-sm text-muted-foreground"
  }, table.getFilteredSelectedRowModel().rows.length, " of", " ", table.getFilteredRowModel().rows.length, " row(s) selected."), /*#__PURE__*/React__namespace.createElement("div", {
    className: "space-x-2"
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: function onClick() {
      return table.previousPage();
    },
    disabled: !table.getCanPreviousPage()
  }, "Previous"), /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: function onClick() {
      return table.nextPage();
    },
    disabled: !table.getCanNextPage()
  }, "Next"))));
}

// Helper function to format dates since we can't use format from date-fns directly
var formatDate = function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

// Define props for the CBREDatePicker component

// Define props for the CBREDateRangePicker component

/**
 * CBREDatePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date picker with CBRE styling and supports label, description, and error handling.
 */
function CBREDatePicker(_ref) {
  var date = _ref.date,
    setDate = _ref.setDate,
    label = _ref.label,
    description = _ref.description,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Select a date" : _ref$placeholder,
    error = _ref.error,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    className = _ref.className,
    disabledDates = _ref.disabledDates;
  // Generate a unique ID for accessibility
  var id = React__namespace.useId();
  var datepickerId = "cbre-datepicker-".concat(id);
  var descriptionId = "".concat(datepickerId, "-description");
  var errorId = "".concat(datepickerId, "-error");
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("space-y-2", className)
  }, label && /*#__PURE__*/React__namespace.createElement(Label, {
    htmlFor: datepickerId,
    className: "text-dark-grey font-calibre"
  }, label), description && !error && /*#__PURE__*/React__namespace.createElement("p", {
    id: descriptionId,
    className: "text-sm text-muted-foreground font-calibre"
  }, description), /*#__PURE__*/React__namespace.createElement(Popover, null, /*#__PURE__*/React__namespace.createElement(PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    id: datepickerId,
    variant: "outline",
    className: cn("w-full justify-start text-left font-normal border-light-grey", "hover:border-cbre-green focus-visible:border-cbre-green focus-visible:ring-accent-light/30", !date && "text-muted-foreground", error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20", disabled && "opacity-50 cursor-not-allowed"),
    disabled: disabled,
    "aria-describedby": description || error ? "".concat(description ? descriptionId : "", " ").concat(error ? errorId : "") : undefined,
    "aria-invalid": error ? "true" : undefined
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.Calendar, {
    className: "mr-2 h-4 w-4"
  }), date ? formatDate(date) : placeholder)), /*#__PURE__*/React__namespace.createElement(PopoverContent, {
    className: "w-[320px] p-0 border-light-grey",
    align: "start"
  }, /*#__PURE__*/React__namespace.createElement(Calendar, {
    mode: "single",
    selected: date,
    onSelect: setDate,
    disabled: disabledDates,
    initialFocus: true
  }))), error && /*#__PURE__*/React__namespace.createElement("p", {
    id: errorId,
    className: "text-sm text-destructive font-calibre"
  }, error));
}

/**
 * CBREDateRangePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date range picker with CBRE styling and supports label, description, and error handling.
 */
function CBREDateRangePicker(_ref2) {
  var dateRange = _ref2.dateRange,
    setDateRange = _ref2.setDateRange,
    label = _ref2.label,
    description = _ref2.description,
    _ref2$placeholder = _ref2.placeholder,
    placeholder = _ref2$placeholder === void 0 ? "Select a date range" : _ref2$placeholder,
    error = _ref2.error,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    className = _ref2.className;
    _ref2.numberOfMonths;
    var disabledDates = _ref2.disabledDates;
  // Generate a unique ID for accessibility
  var id = React__namespace.useId();
  var datepickerId = "cbre-daterangepicker-".concat(id);
  var descriptionId = "".concat(datepickerId, "-description");
  var errorId = "".concat(datepickerId, "-error");

  // Use a single month on small screens, two months on larger screens
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isMobile = _React$useState2[0],
    setIsMobile = _React$useState2[1];
  React__namespace.useEffect(function () {
    var checkScreenSize = function checkScreenSize() {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return function () {
      return window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("space-y-2", className)
  }, label && /*#__PURE__*/React__namespace.createElement(Label, {
    htmlFor: datepickerId,
    className: "text-dark-grey font-calibre"
  }, label), description && !error && /*#__PURE__*/React__namespace.createElement("p", {
    id: descriptionId,
    className: "text-sm text-muted-foreground font-calibre"
  }, description), /*#__PURE__*/React__namespace.createElement(Popover, null, /*#__PURE__*/React__namespace.createElement(PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    id: datepickerId,
    variant: "outline",
    className: cn("w-full justify-start text-left font-normal border-light-grey", "hover:border-cbre-green focus-visible:border-cbre-green focus-visible:ring-accent-light/30", !(dateRange !== null && dateRange !== void 0 && dateRange.from) && "text-muted-foreground", error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20", disabled && "opacity-50 cursor-not-allowed"),
    disabled: disabled,
    "aria-describedby": description || error ? "".concat(description ? descriptionId : "", " ").concat(error ? errorId : "") : undefined,
    "aria-invalid": error ? "true" : undefined
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.Calendar, {
    className: "mr-2 h-4 w-4"
  }), dateRange !== null && dateRange !== void 0 && dateRange.from ? dateRange.to ? /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, formatDate(dateRange.from), " - ", formatDate(dateRange.to)) : formatDate(dateRange.from) : placeholder)), /*#__PURE__*/React__namespace.createElement(PopoverContent, {
    className: "p-0 border-light-grey sm:w-auto md:w-[680px] lg:w-[760px]",
    align: "start"
  }, /*#__PURE__*/React__namespace.createElement(Calendar, {
    mode: "range",
    selected: dateRange,
    onSelect: setDateRange,
    numberOfMonths: isMobile ? 1 : 2,
    disabled: disabledDates,
    initialFocus: true,
    className: "p-3"
  }))), error && /*#__PURE__*/React__namespace.createElement("p", {
    id: errorId,
    className: "text-sm text-destructive font-calibre"
  }, error));
}

// Define type for menu items with support for various item types

/**
 * CBREDropdownMenu - A styled dropdown menu component following CBRE design
 * 
 * Features:
 * - CBRE styling with sharp corners and proper colors
 * - Support for various item types (regular, checkbox, radio, submenu)
 * - Customizable trigger element
 */
function CBREDropdownMenu(_ref) {
  var trigger = _ref.trigger,
    items = _ref.items,
    className = _ref.className,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? "start" : _ref$align,
    _ref$side = _ref.side,
    side = _ref$side === void 0 ? "bottom" : _ref$side,
    radioValue = _ref.radioValue,
    onRadioValueChange = _ref.onRadioValueChange;
  items.some(function (item) {
    return item.type === "radio";
  });

  // Render the menu content based on item types
  var _renderMenuItems = function renderMenuItems(menuItems) {
    var inSubmenu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var radioItems = [];
    var nonRadioItems = [];

    // Separate radio items to wrap them in RadioGroup
    if (!inSubmenu) {
      menuItems.forEach(function (item) {
        if (item.type === "radio") {
          radioItems.push(item);
        } else {
          nonRadioItems.push(item);
        }
      });
    } else {
      nonRadioItems = menuItems;
    }
    return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, nonRadioItems.map(function (item, index) {
      switch (item.type) {
        case "item":
          return /*#__PURE__*/React$1.createElement(DropdownMenuItem, {
            key: index,
            onClick: item.onClick,
            disabled: item.disabled,
            variant: item.variant,
            className: "text-dark-grey hover:text-cbre-green"
          }, item.label);
        case "checkbox":
          return /*#__PURE__*/React$1.createElement(DropdownMenuCheckboxItem, {
            key: index,
            checked: item.checked,
            onCheckedChange: item.onCheckedChange,
            disabled: item.disabled,
            className: "text-dark-grey hover:text-cbre-green"
          }, item.label);
        case "submenu":
          return /*#__PURE__*/React$1.createElement(DropdownMenuSub, {
            key: index
          }, /*#__PURE__*/React$1.createElement(DropdownMenuSubTrigger, {
            disabled: item.disabled,
            className: "text-dark-grey hover:text-cbre-green"
          }, item.label), /*#__PURE__*/React$1.createElement(DropdownMenuPortal, null, /*#__PURE__*/React$1.createElement(DropdownMenuSubContent, null, _renderMenuItems(item.items, true))));
        case "label":
          return /*#__PURE__*/React$1.createElement(DropdownMenuLabel, {
            key: index,
            className: "text-cbre-green font-medium"
          }, item.label);
        case "separator":
          return /*#__PURE__*/React$1.createElement(DropdownMenuSeparator, {
            key: index
          });
        default:
          return null;
      }
    }), radioItems.length > 0 && /*#__PURE__*/React$1.createElement(DropdownMenuRadioGroup, {
      value: radioValue,
      onValueChange: onRadioValueChange
    }, radioItems.map(function (item, index) {
      if (item.type === "radio") {
        return /*#__PURE__*/React$1.createElement(DropdownMenuRadioItem, {
          key: index,
          value: item.value,
          disabled: item.disabled,
          className: "text-dark-grey hover:text-cbre-green"
        }, item.label);
      }
      return null;
    })));
  };

  // Create a custom trigger if a string is provided
  var triggerElement = typeof trigger === 'string' ? /*#__PURE__*/React$1.createElement(Button, {
    variant: "outline",
    className: "border-light-grey flex gap-1 items-center"
  }, trigger, /*#__PURE__*/React$1.createElement(lucideReact.ChevronDown, {
    className: "h-4 w-4 text-dark-grey"
  })) : trigger;
  return /*#__PURE__*/React$1.createElement(DropdownMenu, null, /*#__PURE__*/React$1.createElement(DropdownMenuTrigger, {
    asChild: true
  }, triggerElement), /*#__PURE__*/React$1.createElement(DropdownMenuContent, {
    align: align,
    side: side,
    className: cn("border-light-grey", className)
  }, items.length > 0 ? _renderMenuItems(items) : /*#__PURE__*/React$1.createElement(DropdownMenuItem, {
    disabled: true
  }, "No items")));
}

var _excluded$7 = ["contentClassName", "children"],
  _excluded2$4 = ["className", "children"],
  _excluded3$3 = ["className", "children"];

// Define the props for CBREHoverCard component

/**
 * CBREHoverCard - A styled hover card component following CBRE design
 * 
 * Features:
 * - CBRE styling with consistent shadows and borders
 * - Customizable content and trigger elements
 * - Maintains CBRE typography and colors
 */
function CBREHoverCard(_ref) {
  _ref.contentClassName;
    var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$7);
  return /*#__PURE__*/React__namespace.createElement(HoverCard, props, children);
}

/**
 * CBREHoverCardTrigger - The trigger element for the hover card
 */
function CBREHoverCardTrigger(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    props = _objectWithoutProperties(_ref2, _excluded2$4);
  return /*#__PURE__*/React__namespace.createElement(HoverCardTrigger, _extends({
    className: cn("cursor-pointer", className)
  }, props), children);
}

/**
 * CBREHoverCardContent - The content shown when hovering
 */
function CBREHoverCardContent(_ref3) {
  var className = _ref3.className,
    children = _ref3.children,
    props = _objectWithoutProperties(_ref3, _excluded3$3);
  return /*#__PURE__*/React__namespace.createElement(HoverCardContent, _extends({
    className: cn("z-50 w-64 rounded-none border border-light-grey bg-white p-4", "text-dark-grey font-calibre shadow-md", "data-[state=open]:animate-in", "data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0", "data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95", "data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=top]:slide-in-from-bottom-2", className)
  }, props), children);
}

var _excluded$6 = ["className", "variant"],
  _excluded2$3 = ["className", "variant"],
  _excluded3$2 = ["withHandle", "handleColor", "className"];

// Defining interfaces for CBRE-styled components

/**
 * CBREResizablePanelGroup - A styled resizable panel group following CBRE design
 * 
 * Features:
 * - CBRE styling with customizable variants
 * - Supports both horizontal and vertical orientations
 */
function CBREResizablePanelGroup(_ref) {
  var className = _ref.className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    props = _objectWithoutProperties(_ref, _excluded$6);
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.PanelGroup, _extends({
    "data-slot": "resizable-panel-group",
    "data-variant": variant,
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", variant === 'bordered' && "border border-light-grey", className)
  }, props));
}

/**
 * CBREResizablePanel - A styled resizable panel following CBRE design
 * 
 * Features:
 * - CBRE styling with customizable variants
 * - Integrates with CBREResizablePanelGroup
 */
function CBREResizablePanel(_ref2) {
  var className = _ref2.className,
    _ref2$variant = _ref2.variant,
    variant = _ref2$variant === void 0 ? 'default' : _ref2$variant,
    props = _objectWithoutProperties(_ref2, _excluded2$3);
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.Panel, _extends({
    "data-slot": "resizable-panel",
    "data-variant": variant,
    className: cn(variant === 'bordered' && "border border-light-grey", className)
  }, props));
}

/**
 * CBREResizableHandle - A styled resize handle following CBRE design
 * 
 * Features:
 * - CBRE styling with customizable color options
 * - Optional handle grip for better visual feedback
 */
function CBREResizableHandle(_ref3) {
  var withHandle = _ref3.withHandle,
    _ref3$handleColor = _ref3.handleColor,
    handleColor = _ref3$handleColor === void 0 ? 'light-grey' : _ref3$handleColor,
    className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$2);
  // Define color classes based on the handleColor prop
  var colorClass = {
    'cbre-green': 'bg-cbre-green',
    'accent-green': 'bg-accent-green',
    'dark-grey': 'bg-dark-grey',
    'light-grey': 'bg-light-grey'
  };
  return /*#__PURE__*/React__namespace.createElement(ResizablePrimitive__namespace.PanelResizeHandle, _extends({
    "data-slot": "resizable-handle",
    "data-handle-color": handleColor,
    className: cn("relative flex w-px items-center justify-center bg-light-grey z-50", "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green focus-visible:ring-offset-1", "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:!bg-light-grey", "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1", "data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2", "data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", className),
    style: _objectSpread2({
      backgroundColor: 'var(--colors-light-grey) !important',
      zIndex: '50 !important'
    }, props.style || {})
  }, props), withHandle && /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("z-50 flex h-4 w-3 items-center justify-center border border-light-grey rounded-none", colorClass[handleColor] || "bg-light-grey")
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.GripVerticalIcon, {
    className: "size-2.5 text-white"
  })));
}

var _excluded$5 = ["label", "labelClassName", "description", "error", "triggerClassName", "contentClassName", "id", "className", "children"],
  _excluded2$2 = ["groups", "placeholder"];

// Define the props for CBRESelect component

// Define the group options type for the grouped select

// Define the props for CBREGroupedSelect component

/**
 * CBRESelect component that wraps the shadcn/ui Select component with CBRE styling.
 * Provides a label, description, and error handling.
 */
function CBRESelect(_ref) {
  var label = _ref.label,
    labelClassName = _ref.labelClassName,
    description = _ref.description,
    error = _ref.error,
    triggerClassName = _ref.triggerClassName,
    contentClassName = _ref.contentClassName,
    propId = _ref.id,
    className = _ref.className,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$5);
  // Generate a unique ID for accessibility
  var id = React__namespace.useId();
  var selectId = propId || "cbre-select-".concat(id);
  var descriptionId = "".concat(selectId, "-description");
  var errorId = "".concat(selectId, "-error");
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("space-y-2", className)
  }, label && /*#__PURE__*/React__namespace.createElement(Label, {
    htmlFor: selectId,
    className: cn("text-dark-grey font-calibre", labelClassName)
  }, label), description && !error && /*#__PURE__*/React__namespace.createElement("p", {
    id: descriptionId,
    className: "text-sm text-muted-foreground font-calibre"
  }, description), /*#__PURE__*/React__namespace.createElement(Select, _extends({}, props, {
    "aria-describedby": description || error ? "".concat(description ? descriptionId : "", " ").concat(error ? errorId : "") : undefined
  }), React__namespace.Children.map(children, function (child) {
    if (! /*#__PURE__*/React__namespace.isValidElement(child)) return child;

    // Handle SelectTrigger
    if (child.type === SelectTrigger) {
      // Type cast the child to React element with SelectTrigger props
      var trigger = child;
      return /*#__PURE__*/React__namespace.cloneElement(trigger, {
        id: selectId,
        className: cn("border-light-grey focus-visible:border-cbre-green focus-visible:ring-accent-light/30", "hover:border-cbre-green", error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20", triggerClassName, trigger.props.className),
        "aria-invalid": error ? "true" : undefined
      });
    }

    // Handle SelectContent
    if (child.type === SelectContent) {
      // Type cast the child to React element with SelectContent props  
      var content = child;
      return /*#__PURE__*/React__namespace.cloneElement(content, {
        className: cn("border-light-grey", contentClassName, content.props.className)
      });
    }
    return child;
  })), error && /*#__PURE__*/React__namespace.createElement("p", {
    id: errorId,
    className: "text-sm text-destructive font-calibre"
  }, error));
}

/**
 * CBREGroupedSelect component that renders a select with grouped options.
 * A convenience wrapper around CBRESelect with pre-built option groups.
 */
function CBREGroupedSelect(_ref2) {
  var groups = _ref2.groups,
    _ref2$placeholder = _ref2.placeholder,
    placeholder = _ref2$placeholder === void 0 ? "Select an option" : _ref2$placeholder,
    props = _objectWithoutProperties(_ref2, _excluded2$2);
  return /*#__PURE__*/React__namespace.createElement(CBRESelect, props, /*#__PURE__*/React__namespace.createElement(SelectTrigger, null, /*#__PURE__*/React__namespace.createElement(SelectValue, {
    placeholder: placeholder
  })), /*#__PURE__*/React__namespace.createElement(SelectContent, null, groups.map(function (group, groupIndex) {
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
      key: "group-".concat(groupIndex)
    }, groupIndex > 0 && /*#__PURE__*/React__namespace.createElement(SelectSeparator, null), /*#__PURE__*/React__namespace.createElement(SelectGroup, null, /*#__PURE__*/React__namespace.createElement(SelectLabel, null, group.label), group.options.map(function (option) {
      return /*#__PURE__*/React__namespace.createElement(SelectItem, {
        key: option.value,
        value: option.value,
        disabled: option.disabled
      }, option.label);
    })));
  })));
}

var _excluded$4 = ["className", "orientation", "decorative", "variant", "color", "style"];
/**
 * CBRESeparator - A styled separator component following CBRE design
 * 
 * Features:
 * - CBRE styling with customizable colors and thickness
 * - Supports both horizontal and vertical orientations
 * - Multiple variants: default, thin, thick, and accent
 */
function CBRESeparator(_ref) {
  var className = _ref.className,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
    _ref$decorative = _ref.decorative,
    decorative = _ref$decorative === void 0 ? true : _ref$decorative,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "default" : _ref$variant,
    color = _ref.color,
    style = _ref.style,
    props = _objectWithoutProperties(_ref, _excluded$4);
  // Define variant classes
  var variantClasses = {
    "default": "!bg-cbre-green",
    thin: "!bg-cbre-green data-[orientation=horizontal]:!h-[1px] data-[orientation=vertical]:!w-[1px]",
    thick: "!bg-cbre-green data-[orientation=horizontal]:!h-[3px] data-[orientation=vertical]:!w-[3px]",
    accent: "!bg-accent-green data-[orientation=horizontal]:!h-[2px] data-[orientation=vertical]:!w-[2px]"
  };

  // Color mapping to actual color values
  var colorValues = {
    "cbre-green": "#003F2D",
    "accent-green": "#17E88F",
    "dark-green": "#00241A",
    "midnight": "#242424",
    "sage": "#CDD6C6",
    "celadon": "#8FCDB3",
    "wheat": "#FDE9B3",
    "negative-red": "#AD2A2A"
  };

  // Color classes
  var colorClass = color ? "!bg-".concat(color) : "";

  // Combine variant and color - color should override variant bg
  var bgClass = color ? colorClass : variantClasses[variant];

  // Calculate final styles - ensure they override any other styles
  var finalStyles = _objectSpread2(_objectSpread2(_objectSpread2({}, style || {}), color && colorValues[color] ? {
    backgroundColor: "".concat(colorValues[color], " !important")
  } : {}), orientation === 'vertical' && !(style !== null && style !== void 0 && style.marginLeft) && !(style !== null && style !== void 0 && style.marginRight) ? {
    marginLeft: '16px !important',
    marginRight: '16px !important'
  } : {});

  // React hook to handle component mount
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2);
    _React$useState2[0];
    var setMounted = _React$useState2[1];
  React__namespace.useEffect(function () {
    setMounted(true);
  }, []);
  return /*#__PURE__*/React__namespace.createElement(SeparatorPrimitive__namespace.Root, _extends({
    "data-slot": "separator-root",
    "data-variant": variant,
    "data-color": color,
    decorative: decorative,
    orientation: orientation,
    className: cn("shrink-0 data-[orientation=horizontal]:!h-[2px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:!w-[2px]", "block min-h-[2px] min-w-[2px]", orientation === 'horizontal' ? "my-4" : "mx-4", orientation === 'vertical' ? "!mx-8" : "", bgClass, variant, className),
    style: finalStyles
  }, props));
}

var _excluded$3 = ["className"],
  _excluded2$1 = ["className", "variant"],
  _excluded3$1 = ["className"],
  _excluded4$1 = ["className"],
  _excluded5 = ["className"],
  _excluded6 = ["className"],
  _excluded7 = ["className"],
  _excluded8 = ["className"],
  _excluded9 = ["className"],
  _excluded10 = ["className"],
  _excluded11 = ["className"],
  _excluded12 = ["className"],
  _excluded13 = ["className"],
  _excluded14 = ["className"],
  _excluded15 = ["className"],
  _excluded16 = ["className"],
  _excluded17 = ["className"],
  _excluded18 = ["className"],
  _excluded19 = ["className"],
  _excluded20 = ["className"];

/**
 * CBRESidebarProvider - A CBRE-styled sidebar provider component
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar provider with CBRE-specific defaults
 */
function CBRESidebarProvider(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded$3);
  return /*#__PURE__*/React__namespace.createElement(SidebarProvider, _extends({
    className: cn("text-dark-grey", className)
  }, props));
}

/**
 * CBRESidebar - A CBRE-styled sidebar component
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar with CBRE-specific styling
 */
function CBRESidebar(_ref2) {
  var className = _ref2.className,
    _ref2$variant = _ref2.variant,
    variant = _ref2$variant === void 0 ? "sidebar" : _ref2$variant,
    props = _objectWithoutProperties(_ref2, _excluded2$1);
  return /*#__PURE__*/React__namespace.createElement(Sidebar, _extends({
    className: cn("border-light-grey", className),
    variant: variant
  }, props));
}

/**
 * CBRESidebarTrigger - A CBRE-styled sidebar trigger button
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar trigger with CBRE-specific styling
 */
function CBRESidebarTrigger(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3$1);
  return /*#__PURE__*/React__namespace.createElement(SidebarTrigger, _extends({
    className: cn("text-cbre-green hover:bg-lighter-grey", className)
  }, props));
}

/**
 * CBRESidebarRail - A CBRE-styled sidebar rail for resizing
 */
function CBRESidebarRail(props) {
  return /*#__PURE__*/React__namespace.createElement(SidebarRail, props);
}

/**
 * CBRESidebarHeader - A CBRE-styled sidebar header
 */
function CBRESidebarHeader(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4$1);
  return /*#__PURE__*/React__namespace.createElement(SidebarHeader, _extends({
    className: cn("border-b border-light-grey", className)
  }, props));
}

/**
 * CBRESidebarContent - A CBRE-styled sidebar content area
 */
function CBRESidebarContent(_ref5) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5);
  return /*#__PURE__*/React__namespace.createElement(SidebarContent, _extends({
    className: cn("px-0", className)
  }, props));
}

/**
 * CBRESidebarFooter - A CBRE-styled sidebar footer
 */
function CBRESidebarFooter(_ref6) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6);
  return /*#__PURE__*/React__namespace.createElement(SidebarFooter, _extends({
    className: cn("border-t border-light-grey", className)
  }, props));
}

/**
 * CBRESidebarSeparator - A CBRE-styled sidebar separator
 */
function CBRESidebarSeparator(_ref7) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7);
  return /*#__PURE__*/React__namespace.createElement(SidebarSeparator, _extends({
    className: cn("bg-light-grey", className)
  }, props));
}

/**
 * CBRESidebarGroup - A CBRE-styled sidebar group
 */
function CBRESidebarGroup(_ref8) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded8);
  return /*#__PURE__*/React__namespace.createElement(SidebarGroup, _extends({
    className: cn("py-1", className)
  }, props));
}

/**
 * CBRESidebarGroupLabel - A CBRE-styled sidebar group label
 */
function CBRESidebarGroupLabel(_ref9) {
  var className = _ref9.className,
    props = _objectWithoutProperties(_ref9, _excluded9);
  return /*#__PURE__*/React__namespace.createElement(SidebarGroupLabel, _extends({
    className: cn("text-dark-grey font-financier tracking-normal", className)
  }, props));
}

/**
 * CBRESidebarGroupContent - A CBRE-styled sidebar group content area
 */
function CBRESidebarGroupContent(_ref10) {
  var className = _ref10.className,
    props = _objectWithoutProperties(_ref10, _excluded10);
  return /*#__PURE__*/React__namespace.createElement(SidebarGroupContent, _extends({
    className: cn("px-1", className)
  }, props));
}

/**
 * CBRESidebarGroupAction - A CBRE-styled sidebar group action button
 */
function CBRESidebarGroupAction(_ref11) {
  var className = _ref11.className,
    props = _objectWithoutProperties(_ref11, _excluded11);
  return /*#__PURE__*/React__namespace.createElement(SidebarGroupAction, _extends({
    className: cn("text-cbre-green hover:bg-lighter-grey", className)
  }, props));
}

/**
 * CBRESidebarMenu - A CBRE-styled sidebar menu
 */
function CBRESidebarMenu(_ref12) {
  var className = _ref12.className,
    props = _objectWithoutProperties(_ref12, _excluded12);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenu, _extends({
    className: cn("space-y-1", className)
  }, props));
}

/**
 * CBRESidebarMenuItem - A CBRE-styled sidebar menu item
 */
function CBRESidebarMenuItem(_ref13) {
  var className = _ref13.className,
    props = _objectWithoutProperties(_ref13, _excluded13);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuItem, _extends({
    className: cn("", className)
  }, props));
}

/**
 * CBRESidebarMenuButton - A CBRE-styled sidebar menu button
 */
function CBRESidebarMenuButton(_ref14) {
  var className = _ref14.className,
    props = _objectWithoutProperties(_ref14, _excluded14);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuButton, _extends({
    className: cn("text-dark-grey hover:!bg-lighter-grey", "data-[active=true]:!bg-dark-green data-[active=true]:!text-white", className)
  }, props));
}

/**
 * CBRESidebarMenuAction - A CBRE-styled sidebar menu action button
 */
function CBRESidebarMenuAction(_ref15) {
  var className = _ref15.className,
    props = _objectWithoutProperties(_ref15, _excluded15);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuAction, _extends({
    className: cn("text-cbre-green hover:bg-lighter-grey", className)
  }, props));
}

/**
 * CBRESidebarMenuBadge - A CBRE-styled sidebar menu badge
 */
function CBRESidebarMenuBadge(_ref16) {
  var className = _ref16.className,
    props = _objectWithoutProperties(_ref16, _excluded16);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuBadge, _extends({
    className: cn("bg-cbre-green text-white", className)
  }, props));
}

/**
 * CBRESidebarMenuSkeleton - A CBRE-styled sidebar menu skeleton for loading states
 */
function CBRESidebarMenuSkeleton(_ref17) {
  var className = _ref17.className,
    props = _objectWithoutProperties(_ref17, _excluded17);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuSkeleton, _extends({
    className: cn("", className)
  }, props));
}

/**
 * CBRESidebarMenuSub - A CBRE-styled sidebar submenu
 */
function CBRESidebarMenuSub(_ref18) {
  var className = _ref18.className,
    props = _objectWithoutProperties(_ref18, _excluded18);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuSub, _extends({
    className: cn("pl-6", className)
  }, props));
}

/**
 * CBRESidebarMenuSubItem - A CBRE-styled sidebar submenu item
 */
function CBRESidebarMenuSubItem(_ref19) {
  var className = _ref19.className,
    props = _objectWithoutProperties(_ref19, _excluded19);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuSubItem, _extends({
    className: cn("", className)
  }, props));
}

/**
 * CBRESidebarMenuSubButton - A CBRE-styled sidebar submenu button
 */
function CBRESidebarMenuSubButton(_ref20) {
  var className = _ref20.className,
    props = _objectWithoutProperties(_ref20, _excluded20);
  return /*#__PURE__*/React__namespace.createElement(SidebarMenuSubButton, _extends({
    className: cn("text-dark-grey hover:bg-lighter-grey", "data-[active=true]:text-cbre-green font-medium", className)
  }, props));
}

/**
 * CBREStyledCard - A card component styled according to CBRE brand guidelines
 * 
 * This component demonstrates proper theming and styling for CBRE branded components
 * using shadcn/ui components as a foundation.
 */
function CBREStyledCard(_ref) {
  var title = _ref.title,
    description = _ref.description,
    children = _ref.children,
    className = _ref.className,
    headerClassName = _ref.headerClassName,
    footerClassName = _ref.footerClassName,
    _ref$accentColor = _ref.accentColor,
    accentColor = _ref$accentColor === void 0 ? 'default' : _ref$accentColor,
    footerAction = _ref.footerAction;
  var accentColorMap = {
    'default': 'border-t-cbre-green',
    'accent-green': 'border-t-accent-green',
    'dark-grey': 'border-t-dark-grey',
    'sage': 'border-t-sage',
    'celadon': 'border-t-celadon'
  };
  return /*#__PURE__*/React$1.createElement(Card, {
    className: cn("flex flex-col border-t-4", accentColorMap[accentColor], className)
  }, /*#__PURE__*/React$1.createElement(CardHeader, {
    className: headerClassName
  }, /*#__PURE__*/React$1.createElement(CardTitle, {
    className: "text-cbre-green font-financier"
  }, title), description && /*#__PURE__*/React$1.createElement(CardDescription, {
    className: "text-dark-grey"
  }, description)), /*#__PURE__*/React$1.createElement(CardContent, {
    className: "flex-grow text-dark-grey"
  }, children), footerAction && /*#__PURE__*/React$1.createElement(CardFooter, {
    className: footerClassName
  }, /*#__PURE__*/React$1.createElement(Button, {
    variant: "ghost",
    size: "sm",
    className: "text-cbre-green p-0 hover:bg-transparent hover:text-accent-green",
    onClick: footerAction.onClick
  }, footerAction.label)));
}

var _excluded$2 = ["defaultValue", "value", "onValueChange", "className", "children", "variant", "size"],
  _excluded2 = ["className", "children", "variant", "size"],
  _excluded3 = ["value", "className", "children", "variant", "size", "disabled"],
  _excluded4 = ["value", "className", "children"];

// Create context for CBRE Tabs

var CBRETabsContext = /*#__PURE__*/React$1.createContext({
  variant: "underline",
  size: "md"
});
/**
 * CBRETabs - A styled tabs component following CBRE design
 * 
 * Features:
 * - CBRE styling with cbre-green underline or boxed tabs
 * - Two variants: underline (default) and boxed
 * - Three size options
 */
function CBRETabs(_ref) {
  var defaultValue = _ref.defaultValue,
    value = _ref.value,
    onValueChange = _ref.onValueChange,
    className = _ref.className,
    children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "underline" : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "md" : _ref$size,
    props = _objectWithoutProperties(_ref, _excluded$2);
  return /*#__PURE__*/React$1.createElement(CBRETabsContext.Provider, {
    value: {
      variant: variant,
      size: size
    }
  }, /*#__PURE__*/React$1.createElement(Tabs, _extends({
    defaultValue: defaultValue,
    value: value,
    onValueChange: onValueChange,
    className: cn("w-full", className)
  }, props), children));
}
function CBRETabsList(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    propVariant = _ref2.variant,
    propSize = _ref2.size,
    props = _objectWithoutProperties(_ref2, _excluded2);
  // Get context values, with prop values taking precedence
  var context = React$1.useContext(CBRETabsContext);
  var variant = propVariant || context.variant;
  var size = propSize || context.size;

  // Size classes
  var sizeClasses = {
    sm: "h-9 gap-2",
    md: "h-10 gap-3",
    lg: "h-12 gap-4"
  };

  // Variant classes
  var variantClasses = {
    underline: "border-b border-light-grey",
    boxed: "rounded-none"
  };
  return /*#__PURE__*/React$1.createElement(TabsList, _extends({
    "data-variant": variant,
    className: cn("w-full flex justify-start p-0 rounded-none relative", sizeClasses[size], variantClasses[variant], className)
  }, props), children);
}
function CBRETabsTrigger(_ref3) {
  var value = _ref3.value,
    className = _ref3.className,
    children = _ref3.children,
    propVariant = _ref3.variant,
    propSize = _ref3.size,
    disabled = _ref3.disabled,
    props = _objectWithoutProperties(_ref3, _excluded3);
  // Get context values, with prop values taking precedence
  var context = React$1.useContext(CBRETabsContext);
  var variant = propVariant || context.variant;
  var size = propSize || context.size;

  // Size classes
  var sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-2 text-lg"
  };

  // Variant styles for tabs - simplified to avoid conflicts with our global CSS
  var variantClasses = {
    underline: cn("font-calibre font-medium", "data-[state=inactive]:text-dark-grey", "rounded-none hover:text-cbre-green"),
    boxed: cn("font-calibre font-medium", "data-[state=inactive]:text-dark-grey", "rounded-none hover:text-cbre-green")
  };
  return /*#__PURE__*/React$1.createElement(TabsTrigger, _extends({
    value: value,
    disabled: disabled,
    "data-variant": variant,
    className: cn(
    // Base styles
    "transition-all focus-visible:outline-none focus-visible:ring-2", "focus-visible:ring-accent-green focus-visible:ring-offset-2", "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
    // Apply size and variant specific styles
    sizeClasses[size], variantClasses[variant], className)
  }, props), children);
}
function CBRETabsContent(_ref4) {
  var value = _ref4.value,
    className = _ref4.className,
    children = _ref4.children,
    props = _objectWithoutProperties(_ref4, _excluded4);
  return /*#__PURE__*/React$1.createElement(TabsContent, _extends({
    value: value,
    className: cn("mt-6 focus-visible:outline-none focus-visible:ring-2", "focus-visible:ring-accent-green focus-visible:ring-offset-2", className)
  }, props), children);
}

var _excluded$1 = ["children"];
/**
 * CBRE Theme Provider
 * 
 * This component ensures consistent CBRE theming across the application.
 * We're extending the next-themes provider to ensure proper theming for CBRE's brand.
 */
function CBREThemeProvider(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$1);
  // Use a state and effect to prevent hydration mismatch
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mounted = _React$useState2[0],
    setMounted = _React$useState2[1];

  // Only render the provider after first client-side render to avoid hydration mismatch
  React__namespace.useEffect(function () {
    setMounted(true);
  }, []);

  // During server rendering or first mount, just render children without theme provider
  if (!mounted) {
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, children);
  }

  // Once mounted on client, use the theme provider
  return /*#__PURE__*/React__namespace.createElement(nextThemes.ThemeProvider, _extends({
    attribute: "class",
    defaultTheme: "light",
    enableSystem: false,
    disableTransitionOnChange: true,
    forcedTheme: "light" // Force light theme for CBRE
  }, props), children);
}

// Re-export the Toaster component with CBRE styling
function CBREToaster() {
  return /*#__PURE__*/React__namespace.createElement(sonner.Toaster, {
    theme: "light",
    className: "font-calibre",
    toastOptions: {
      classNames: {
        toast: "bg-white border-light-grey",
        title: "text-dark-grey font-semibold",
        description: "text-dark-grey",
        actionButton: "bg-cbre-green text-white hover:bg-cbre-green/90",
        cancelButton: "bg-muted text-muted-foreground hover:bg-muted/90",
        error: "bg-destructive/15 border-destructive text-destructive",
        success: "bg-accent-green/15 border-accent-green text-cbre-green"
      }
    }
  });
}
// Helper function to show toasts with CBRE styling
function toast(_ref) {
  var title = _ref.title,
    description = _ref.description,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "default" : _ref$variant,
    action = _ref.action,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 5000 : _ref$duration;
  return sonner.toast(title || description, _objectSpread2(_objectSpread2(_objectSpread2({
    description: title ? description : undefined,
    duration: duration
  }, variant === "success" && {
    success: true
  }), variant === "error" && {
    error: true
  }), action && {
    action: {
      label: action.label,
      onClick: action.onClick
    }
  }));
}

/**
 * CBREToggle - A styled toggle switch component following CBRE design
 * 
 * Features:
 * - CBRE green color for checked state
 * - Optional label and description
 * - Three size variants (sm, md, lg)
 */
function CBREToggle(_ref) {
  var checked = _ref.checked,
    onCheckedChange = _ref.onCheckedChange,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    label = _ref.label,
    description = _ref.description,
    className = _ref.className,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size;
  // Size class mappings
  var sizeVariants = {
    sm: {
      root: "h-5 w-9",
      thumb: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
    },
    md: {
      root: "h-6 w-11",
      thumb: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
    },
    lg: {
      root: "h-7 w-14",
      thumb: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5"
    }
  };
  return /*#__PURE__*/React$1.createElement("div", {
    className: cn("flex items-center", className)
  }, (label || description) && /*#__PURE__*/React$1.createElement("div", {
    className: "mr-4 flex flex-col justify-center"
  }, label && /*#__PURE__*/React$1.createElement("div", {
    className: "text-base font-calibre font-medium text-dark-grey"
  }, label), description && /*#__PURE__*/React$1.createElement("div", {
    className: "text-sm font-calibre text-dark-grey/70"
  }, description)), /*#__PURE__*/React$1.createElement(SwitchPrimitives__namespace.Root, {
    checked: checked,
    onCheckedChange: onCheckedChange,
    disabled: disabled,
    className: cn("relative inline-flex shrink-0 cursor-pointer items-center rounded-full", "border-none outline-none focus-visible:ring-2 focus-visible:ring-accent-green", "focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-[var(--cbre-green)] data-[state=unchecked]:bg-[var(--light-grey)]", sizeVariants[size].root)
  }, /*#__PURE__*/React$1.createElement(SwitchPrimitives__namespace.Thumb, {
    className: cn("pointer-events-none block rounded-full bg-white", "shadow-md transition-transform", sizeVariants[size].thumb)
  })));
}

var _excluded = ["value", "disabled", "className", "children", "variant", "size"];
/**
 * CBREToggleGroup - A styled toggle group component following CBRE design
 * 
 * Features:
 * - CBRE green color for active state
 * - Can be used in single or multiple selection mode
 * - Optional outline variant
 * - Three size variants (sm, md, lg)
 */
function CBREToggleGroup(props) {
  return /*#__PURE__*/React$1.createElement(ToggleGroup, {
    type: props.type,
    value: props.value,
    onValueChange: props.onValueChange,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    className: cn("inline-flex items-center justify-center gap-1", props.className)
  }, props.children);
}
function CBREToggleGroupItem(_ref) {
  var value = _ref.value,
    disabled = _ref.disabled,
    className = _ref.className,
    children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "default" : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "md" : _ref$size,
    props = _objectWithoutProperties(_ref, _excluded);
  // Size variants
  var sizeClasses = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-9 px-3",
    lg: "h-10 px-4"
  };

  // Variant styles
  var variantClasses = {
    "default": cn("bg-transparent data-[state=on]:bg-[var(--cbre-green)] data-[state=on]:text-white", "border border-light-grey data-[state=on]:border-[var(--cbre-green)]", "hover:bg-light-grey/20 data-[state=on]:hover:bg-[var(--cbre-green)]"),
    outline: cn("bg-transparent data-[state=on]:bg-transparent", "border border-light-grey data-[state=on]:border-[var(--cbre-green)]", "text-dark-grey data-[state=on]:text-[var(--cbre-green)]", "hover:bg-light-grey/20 data-[state=on]:hover:bg-transparent")
  };
  return /*#__PURE__*/React$1.createElement(ToggleGroupItem, _extends({
    value: value,
    disabled: disabled,
    className: cn("rounded-none font-calibre font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2", "focus-visible:ring-accent-green focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", sizeClasses[size], variantClasses[variant], className)
  }, props), children);
}

function CBRETooltip(_ref) {
  var children = _ref.children,
    content = _ref.content,
    _ref$delayDuration = _ref.delayDuration,
    delayDuration = _ref$delayDuration === void 0 ? 200 : _ref$delayDuration,
    _ref$side = _ref.side,
    side = _ref$side === void 0 ? "top" : _ref$side,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? "center" : _ref$align;
  return /*#__PURE__*/React__namespace.createElement(Tooltip, {
    delayDuration: delayDuration
  }, /*#__PURE__*/React__namespace.createElement(TooltipTrigger, {
    asChild: true
  }, children), /*#__PURE__*/React__namespace.createElement(TooltipContent, {
    side: side,
    align: align
  }, content));
}

/**
 * CBRE Components Barrel Export
 * This file exports all CBRE-specific components to simplify imports
 */

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CBREAccordion: CBREAccordion,
  CBREArrowButton: CBREArrowButton,
  CBREBadge: CBREBadge,
  CBREButton: CBREButton,
  CBRECard: CBRECard,
  CBRECardContent: CBRECardContent,
  CBRECardDescription: CBRECardDescription,
  CBRECardFooter: CBRECardFooter,
  CBRECardHeader: CBRECardHeader,
  CBRECardTitle: CBRECardTitle,
  CBRECheckboxGroup: CBRECheckboxGroup,
  CBREDataTable: CBREDataTable,
  CBREDatePicker: CBREDatePicker,
  CBREDateRangePicker: CBREDateRangePicker,
  CBREDropdownMenu: CBREDropdownMenu,
  CBREGroupedSelect: CBREGroupedSelect,
  CBREHorizontalBarChart: CBREHorizontalBarChart,
  CBREHoverCard: CBREHoverCard,
  CBREHoverCardContent: CBREHoverCardContent,
  CBREHoverCardTrigger: CBREHoverCardTrigger,
  CBREResizableHandle: CBREResizableHandle,
  CBREResizablePanel: CBREResizablePanel,
  CBREResizablePanelGroup: CBREResizablePanelGroup,
  CBRESelect: CBRESelect,
  CBRESeparator: CBRESeparator,
  CBRESidebar: CBRESidebar,
  CBRESidebarContent: CBRESidebarContent,
  CBRESidebarFooter: CBRESidebarFooter,
  CBRESidebarGroup: CBRESidebarGroup,
  CBRESidebarGroupAction: CBRESidebarGroupAction,
  CBRESidebarGroupContent: CBRESidebarGroupContent,
  CBRESidebarGroupLabel: CBRESidebarGroupLabel,
  CBRESidebarHeader: CBRESidebarHeader,
  CBRESidebarMenu: CBRESidebarMenu,
  CBRESidebarMenuAction: CBRESidebarMenuAction,
  CBRESidebarMenuBadge: CBRESidebarMenuBadge,
  CBRESidebarMenuButton: CBRESidebarMenuButton,
  CBRESidebarMenuItem: CBRESidebarMenuItem,
  CBRESidebarMenuSkeleton: CBRESidebarMenuSkeleton,
  CBRESidebarMenuSub: CBRESidebarMenuSub,
  CBRESidebarMenuSubButton: CBRESidebarMenuSubButton,
  CBRESidebarMenuSubItem: CBRESidebarMenuSubItem,
  CBRESidebarProvider: CBRESidebarProvider,
  CBRESidebarRail: CBRESidebarRail,
  CBRESidebarSeparator: CBRESidebarSeparator,
  CBRESidebarTrigger: CBRESidebarTrigger,
  CBRESimpleBarChart: CBRESimpleBarChart,
  CBRESimpleLineChart: CBRESimpleLineChart,
  CBRESimplePieChart: CBRESimplePieChart,
  CBREStyledCard: CBREStyledCard,
  CBRETable: Table,
  CBRETableBody: TableBody,
  CBRETableCaption: TableCaption,
  CBRETableCell: TableCell,
  CBRETableFooter: TableFooter,
  CBRETableHead: TableHead,
  CBRETableHeader: TableHeader,
  CBRETableRow: TableRow,
  CBRETabs: CBRETabs,
  CBRETabsContent: CBRETabsContent,
  CBRETabsList: CBRETabsList,
  CBRETabsTrigger: CBRETabsTrigger,
  CBREThemeProvider: CBREThemeProvider,
  CBREToaster: CBREToaster,
  CBREToggle: CBREToggle,
  CBREToggleGroup: CBREToggleGroup,
  CBREToggleGroupItem: CBREToggleGroupItem,
  CBRETooltip: CBRETooltip,
  CBRETooltipProvider: TooltipProvider,
  Card: CBRECard,
  CardContent: CBRECardContent,
  CardDescription: CBRECardDescription,
  CardFooter: CBRECardFooter,
  CardHeader: CBRECardHeader,
  CardTitle: CBRECardTitle,
  ChartTooltip: ChartTooltip,
  Checkbox: Checkbox,
  CheckboxGroup: CBRECheckboxGroup,
  ResizableHandle: CBREResizableHandle,
  ResizablePanel: CBREResizablePanel,
  ResizablePanelGroup: CBREResizablePanelGroup,
  Separator: CBRESeparator,
  Sidebar: CBRESidebar,
  SidebarContent: CBRESidebarContent,
  SidebarFooter: CBRESidebarFooter,
  SidebarGroup: CBRESidebarGroup,
  SidebarGroupAction: CBRESidebarGroupAction,
  SidebarGroupContent: CBRESidebarGroupContent,
  SidebarGroupLabel: CBRESidebarGroupLabel,
  SidebarHeader: CBRESidebarHeader,
  SidebarMenu: CBRESidebarMenu,
  SidebarMenuAction: CBRESidebarMenuAction,
  SidebarMenuBadge: CBRESidebarMenuBadge,
  SidebarMenuButton: CBRESidebarMenuButton,
  SidebarMenuItem: CBRESidebarMenuItem,
  SidebarMenuSkeleton: CBRESidebarMenuSkeleton,
  SidebarMenuSub: CBRESidebarMenuSub,
  SidebarMenuSubButton: CBRESidebarMenuSubButton,
  SidebarMenuSubItem: CBRESidebarMenuSubItem,
  SidebarProvider: CBRESidebarProvider,
  SidebarRail: CBRESidebarRail,
  SidebarSeparator: CBRESidebarSeparator,
  SidebarTrigger: CBRESidebarTrigger,
  Tabs: CBRETabs,
  TabsContent: CBRETabsContent,
  TabsList: CBRETabsList,
  TabsTrigger: CBRETabsTrigger,
  badgeVariants: badgeVariants,
  chartConfig: chartConfig,
  toast: toast,
  useSidebar: useSidebar,
  useToast: sonner.useSonner
});

/**
 * CBRECTABlock - A styled call-to-action block component following CBRE design
 * 
 * Features:
 * - Light gray background (#C0D4CB)
 * - Title with Get in Touch button
 */
function CBRECTABlock(_ref) {
  var title = _ref.title,
    _ref$buttonText = _ref.buttonText,
    buttonText = _ref$buttonText === void 0 ? "Get in Touch" : _ref$buttonText,
    onButtonClick = _ref.onButtonClick,
    className = _ref.className;
  return /*#__PURE__*/React$1.createElement("div", {
    className: cn("flex flex-col md:flex-row items-center justify-between bg-[var(--lighter-grey)] p-8", className)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "mb-6 md:mb-0 md:mr-8"
  }, /*#__PURE__*/React$1.createElement("h3", {
    className: "text-[var(--cbre-green)] font-financier text-xl md:text-2xl"
  }, title)), /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement(CBREButton, {
    variant: "view-more",
    onClick: onButtonClick
  }, buttonText)));
}

/**
 * CBREQuoteBlock - A styled quote block component following CBRE design
 * 
 * Features:
 * - Light gray background (#C0D4CB)
 * - Dark green left border (#012A2D)
 * - Quote with executive photo
 */
function CBREQuoteBlock(_ref) {
  var quote = _ref.quote,
    author = _ref.author,
    role = _ref.role,
    imageSrc = _ref.imageSrc,
    className = _ref.className;
  return /*#__PURE__*/React$1.createElement("div", {
    className: cn("flex flex-col md:flex-row bg-[var(--lighter-grey)] border-l-4 border-l-[var(--dark-green)]", className)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "p-8 md:w-2/3 flex flex-col justify-center"
  }, /*#__PURE__*/React$1.createElement("blockquote", {
    className: "text-[var(--cbre-green)] font-financier text-xl md:text-2xl italic mb-6"
  }, "\"", quote, "\""), /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement("p", {
    className: "font-medium text-[var(--cbre-green)]"
  }, author), /*#__PURE__*/React$1.createElement("p", {
    className: "text-sm text-[var(--cbre-green)]"
  }, role))), imageSrc && /*#__PURE__*/React$1.createElement("div", {
    className: "md:w-1/3 relative"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "h-full"
  }, imageSrc ? /*#__PURE__*/React$1.createElement(Image, {
    src: imageSrc,
    alt: author,
    fill: true,
    className: "object-cover object-center"
  }) : /*#__PURE__*/React$1.createElement("div", {
    className: "bg-light-grey w-full h-full flex items-center justify-center"
  }, /*#__PURE__*/React$1.createElement("span", {
    className: "text-dark-grey"
  }, "Photo Placeholder")))));
}

/**
 * Block Components Barrel Export
 * This file exports higher-level block components that compose multiple UI elements
 */

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CBRECTABlock: CBRECTABlock,
  CBREQuoteBlock: CBREQuoteBlock
});

var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  var _React$useState = React__namespace.useState(undefined),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isMobile = _React$useState2[0],
    setIsMobile = _React$useState2[1];
  React__namespace.useEffect(function () {
    var mql = window.matchMedia("(max-width: ".concat(MOBILE_BREAKPOINT - 1, "px)"));
    var onChange = function onChange() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return function () {
      return mql.removeEventListener("change", onChange);
    };
  }, []);
  return !!isMobile;
}

exports.Blocks = index;
exports.CBRE = index$1;
exports.UI = index$2;
exports.cn = cn;
exports.useIsMobile = useIsMobile;
//# sourceMappingURL=index.js.map
