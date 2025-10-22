# Draft Access Flow - User Experience Guide

## Overview

The draft access system has been upgraded with a much better user experience:

1. **Modal for Token Entry** - Instead of immediate redirect
2. **Custom 403 Page** - Beautiful access denied page
3. **Attempt Tracking** - Graceful failure after 3 attempts
4. **URL Token Persistence** - Token saved to URL on success

---

## User Flow

### Scenario 1: Accessing Draft Post Without Token

```
User visits: /blog/draft-example
           ↓
    [Loading Screen]
           ↓
   [Modal Appears] 
   ┌─────────────────────────┐
   │    🔒 Draft Content     │
   │                         │
   │ This post is currently  │
   │ in draft mode. Enter    │
   │ the preview token.      │
   │                         │
   │ [Password Input Field]  │
   │                         │
   │ [Cancel] [Access Draft] │
   └─────────────────────────┘
```

**User Actions:**
- **Cancel** → Redirects to `/blog`
- **Enter correct token** → Shows content, URL becomes `/blog/draft-example?preview=token`
- **Enter wrong token** → Error message, try again (3 attempts max)

---

### Scenario 2: Three Failed Attempts

```
Attempt 1: Wrong token → "Invalid preview token. Please try again."
Attempt 2: Wrong token → "Invalid preview token. Please try again." (Attempts: 2/3)
Attempt 3: Wrong token → "Invalid preview token. Please try again." (Redirecting...)
              ↓
        [403 Page]
        ┌─────────────────────────┐
        │        🔒               │
        │        403              │
        │   Access Denied         │
        │                         │
        │ This content is in      │
        │ draft mode and requires │
        │ special access to view. │
        │                         │
        │ [View Published Posts]  │
        │ [Go Home]               │
        └─────────────────────────┘
```

---

### Scenario 3: Accessing with Token in URL

```
User visits: /blog/draft-example?preview=secret
           ↓
    [Loading Screen]
           ↓
   ✓ Token validated
           ↓
    [Show Content]
```

**Result:** Instant access, no modal shown

---

## Features

### Modal Features

- **Password Input** - Secure token entry field
- **Real-time Validation** - Immediate feedback on submission
- **Error Messages** - Clear, helpful error text
- **Attempt Counter** - Shows "Attempts: X/3" after first failure
- **Theme-aware Styling** - Uses CSS variables for dark/light mode
- **Keyboard Navigation** - Auto-focus on input, Enter to submit
- **Backdrop Blur** - Professional modal overlay effect

### 403 Page Features

- **Animated Lock Icon** - Pulsing animation with decorative rings
- **Clear Error Code** - Large "403" display
- **Helpful Message** - Explains why access is denied
- **Action Buttons** - Quick navigation to published content or home
- **Theme-aware Design** - Matches your site's theme
- **Additional Context** - Explains what draft posts are

---

## Technical Implementation

### DraftPreviewGate Component

**State Management:**
```typescript
- isAuthorized: boolean    // Whether user can view content
- isChecking: boolean      // Loading state
- showModal: boolean       // Modal visibility
- inputToken: string       // User input
- error: string           // Error message
- attempts: number        // Failed attempt counter
```

**Flow Logic:**
```typescript
1. Check if draft → No: Show content immediately
2. Check URL token → Valid: Show content
3. No token → Show modal
4. User submits:
   - Correct → Update URL, show content
   - Wrong (< 3 attempts) → Show error, reset input
   - Wrong (3 attempts) → Redirect to /403
```

**URL Management:**
```typescript
// On successful token entry:
url.searchParams.set('preview', inputToken);
window.history.replaceState({}, '', url.toString());
// User can now share this URL for instant access
```

---

## Configuration

The preview token is set in `config/plugins.yaml`:

```yaml
drafts:
  enabled: true
  showInList: false
  previewToken: "your-secret-token"  # Change this!
```

**Security Notes:**
- Token is checked client-side (suitable for draft previews)
- Not for sensitive/secure content
- Token is visible in URL when authenticated
- Consider using different tokens per draft for fine-grained access

---

## User Experience Benefits

### Before (Old System)
- ❌ Immediate 404 redirect (jarring)
- ❌ No way to enter token without knowing URL syntax
- ❌ No feedback on why access denied
- ❌ Generic 404 page

### After (New System)
- ✅ Smooth modal experience
- ✅ Clear instructions on what to do
- ✅ Progressive disclosure (modal → 403 page)
- ✅ Helpful error messages
- ✅ Beautiful, branded 403 page
- ✅ Easy sharing via URL with token
- ✅ Attempt tracking prevents brute force

---

## Styling

All components use CSS variables for theming:

```css
--color-background      /* Main background */
--color-text           /* Primary text */
--color-muted          /* Muted background */
--color-muted-foreground /* Secondary text */
--color-border         /* Border color */
```

This ensures:
- Consistent with your design system
- Works in light and dark mode
- No hardcoded colors
- Smooth theme transitions

---

## Testing

### Test Cases

1. **Access draft without token:**
   - Visit `/blog/draft-example`
   - Verify modal appears
   - Click "Cancel" → Should go to `/blog`

2. **Enter correct token:**
   - Enter correct token in modal
   - Click "Access Draft"
   - Should show content
   - URL should update with `?preview=token`

3. **Enter wrong token (3 times):**
   - Enter wrong token
   - See error message
   - Try again (2 more times)
   - Should redirect to `/403`

4. **Access with token in URL:**
   - Visit `/blog/draft-example?preview=correct-token`
   - Should show content immediately (no modal)

5. **Share link with token:**
   - Copy URL after successful authentication
   - Open in new incognito tab
   - Should work without modal

---

## Future Enhancements

Potential improvements:

1. **Token Expiry** - Time-based tokens that expire
2. **Multiple Tokens** - Different tokens per draft post
3. **Usage Analytics** - Track who accesses drafts and when
4. **Email Validation** - Require email before showing token input
5. **Remember Token** - Store in localStorage for easier access
6. **Social Preview Cards** - Custom OG images for draft posts
7. **Comments/Feedback** - Allow draft reviewers to leave comments

---

## Troubleshooting

**Modal doesn't appear:**
- Check if `draft: true` in post frontmatter
- Verify `drafts.enabled: true` in config
- Check browser console for errors

**403 page doesn't show:**
- Ensure `/app/403/page.tsx` exists
- Check routing configuration
- Verify attempts counter working

**Token not working:**
- Verify token matches in `config/plugins.yaml`
- Check for typos (case-sensitive)
- Try clearing browser cache

**URL not updating:**
- Check browser console for errors
- Verify `window.history.replaceState` support
- Test in different browser

---

## Conclusion

This implementation provides a professional, user-friendly way to handle draft post access with:

- Clear communication
- Graceful failure handling  
- Beautiful UI/UX
- Security through obscurity
- Easy sharing capabilities

Perfect for sharing work-in-progress content with clients, editors, or beta readers!
