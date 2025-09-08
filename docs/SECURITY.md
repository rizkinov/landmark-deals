# 🔒 Security Guidelines

## ✅ Password and Credentials Policy

### **❌ NEVER Commit:**
- Plain text passwords
- API keys or secrets
- Private keys or certificates
- Authentication tokens
- Database connection strings with credentials

### **✅ DO Use:**
- Environment variables for sensitive data
- Placeholder text: `[PRIVATE - Contact admin for credentials]`
- Supabase environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔐 Admin Authentication

### **Current Setup:**
- Super admin email: `rizki.novianto@cbre.com`
- Password: **PRIVATE** (not stored in repository)
- Managed through Supabase Auth dashboard

### **Best Practices:**
- Passwords should be complex (min 12 characters)
- Enable 2FA when available
- Rotate passwords regularly
- Use unique passwords for each service

## 🛡️ Database Security

### **RLS Policies:**
- All admin functions use `SECURITY DEFINER`
- Row Level Security enabled on all tables
- Proper access control for admin vs public users

### **Audit Logging:**
- All admin actions are logged
- Includes IP address and user agent
- Retention policy should be defined

## 📋 Security Checklist

### **Before Deployment:**
- [ ] No hardcoded passwords in code
- [ ] Environment variables properly configured
- [ ] Database RLS policies tested
- [ ] Admin authentication working
- [ ] Audit logging functional
- [ ] HTTPS enabled in production

### **Regular Security Maintenance:**
- [ ] Review admin user accounts monthly
- [ ] Check audit logs for suspicious activity
- [ ] Update dependencies regularly
- [ ] Monitor for failed login attempts

## 🚨 Security Incident Response

### **If Credentials Are Compromised:**
1. **Immediately** change passwords in Supabase dashboard
2. **Revoke** any exposed API keys
3. **Review** audit logs for unauthorized access
4. **Update** environment variables in deployment
5. **Notify** team members of the incident

### **If Suspicious Activity Detected:**
1. **Check** admin audit logs
2. **Verify** all admin user accounts are legitimate
3. **Review** recent deal modifications
4. **Consider** temporarily disabling admin access

---

**🔒 Security is everyone's responsibility. When in doubt, ask!** 