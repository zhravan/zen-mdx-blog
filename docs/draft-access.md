# Draft Access Flow

The draft access system has been upgraded with a much better user experience:

1. **Modal for Token Entry** - Instead of immediate redirect
2. **Custom 403 Page** - Beautiful access denied page
3. **Attempt Tracking** - Graceful failure after 3 attempts
4. **URL Token Persistence** - Token saved to URL on success

---

## User Flow

**User Actions:**

- **Cancel** → Redirects to `/blog`
- **Enter correct token** → Shows content, URL becomes `/blog/draft-example?preview=token`
- **Enter wrong token** → Error message, try again (3 attempts max)

---

This feature allows a professional, user friendly way to handle draft post access with:

- Clear communication
- Graceful failure handling  
- Security through obscurity
- Easy sharing capabilities before publishing

Perfect for sharing work-in-progress content with editors, or beta readers!
