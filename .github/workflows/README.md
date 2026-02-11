# CI/CD Pipeline Documentation

This directory contains GitHub Actions workflows for automated testing and deployment validation.

## 🚀 Workflows

### `ci.yml` - Continuous Integration Pipeline

Runs automatically on:
- **Push to main branch** - Full validation before deployment
- **Pull requests** - Prevents merging broken code

#### Jobs:

**1. Build & Test** ✅
- TypeScript type checking
- Next.js production build
- Legal pages verification
- Footer links validation
- Email address detection (should be none)
- GitHub issues links verification

**2. Lighthouse Performance** 🎯
- Runs on pull requests only
- Measures performance, accessibility, SEO
- Helps catch performance regressions

**3. Security Audit** 🔒
- npm audit for vulnerabilities
- Scans for sensitive data/tokens
- Ensures no hardcoded secrets

**4. Deployment Check** 🚢
- Confirms build success
- Notifies about Vercel auto-deployment
- Runs only on main branch pushes

## 📊 How to View Results

1. Go to: https://github.com/[your-org]/travelfreedomindex-website/actions
2. Click on any workflow run
3. View detailed logs for each job

## ⚠️ What Gets Blocked

The following will **FAIL** the build:
- ❌ TypeScript errors
- ❌ Build failures
- ❌ Missing legal pages
- ❌ Missing footer links (privacy/disclaimer)
- ❌ Email addresses in legal pages
- ❌ Missing GitHub issues links in legal pages
- ❌ Hardcoded sensitive tokens

## ✅ Best Practices

1. **Always create a pull request** - CI runs before merging
2. **Fix failing checks** - Don't merge with red ❌ status
3. **Review Lighthouse scores** - Keep performance high
4. **Monitor security alerts** - Fix vulnerabilities promptly

## 🔧 Local Testing

Before pushing, run these locally:

```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Check legal pages
ls -la app/legal/disclaimer/page.tsx app/legal/privacy/page.tsx

# Security audit
npm audit
```

## 🎯 Future Enhancements

Potential additions:
- [ ] E2E tests with Playwright
- [ ] Visual regression tests
- [ ] Automated sitemap validation
- [ ] Broken link checker
- [ ] Accessibility tests (axe-core)
- [ ] Bundle size monitoring

## 📝 Maintenance

Update Node.js version in workflow when upgrading:
```yaml
node-version: '20'  # Update this
```

Update npm audit level if needed:
```yaml
npm audit --audit-level=high  # Options: low, moderate, high, critical
```
