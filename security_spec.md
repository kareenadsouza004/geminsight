# Security Specification: GemInsight Firestore ABAC & Rules Validation

## Phase 0: Security Invariants & Public Access Architecture

The user has explicitly specified:
- Anyone can use the app without signing in.
- Executive strategies in the Action Cockpit, their progress, and Talk to Data chat history must persist in Cloud Firestore across refreshes.
- Strict schema validation, boundary sizes, ID sanitization, and type-checks must be maintained so no invalid or oversized payloads can compromise the database.

### 1. Data Invariants

1. **Strategy Integrity Invariant**:
   - `id`: string, <= 128 characters, matching alphanumeric/hyphen/underscore.
   - `headline`: string, <= 300 characters.
   - `percentCompleted`: number between 0 and 100 inclusive.
   - `persona`: string, <= 120 characters representing the leadership persona.

2. **ChatMessage Integrity Invariant**:
   - `id`: string, <= 128 characters, matching alphanumeric/hyphen/underscore.
   - `role`: must be either `'user'` or `'assistant'`.
   - `text`: string, <= 10000 characters.
   - `persona`: string, <= 120 characters.

3. **Global Catch-All Default-Deny**:
   - Any document path outside `/strategies/{strategyId}`, `/chatMessages/{messageId}`, and `/test/{docId}` is strictly denied (`allow read, write: if false;`).

---

## 2. The "Dirty Dozen" Payloads (Adversarial Security Test Cases)

1. **Junk Path ID Attack**: Strategy write with document ID containing illegal characters or path traversal (e.g. `../../etc/passwd` or 500-char string). *Result: Denied by `isValidId(strategyId)`*.
2. **Negative Progress Attack**: Strategy write with `percentCompleted: -25`. *Result: Denied by `>= 0 && <= 100`*.
3. **Progress Overflow Attack**: Strategy write with `percentCompleted: 150`. *Result: Denied by `<= 100`*.
4. **Non-Numeric Progress Attack**: Strategy write with `percentCompleted: "eighty percent"`. *Result: Denied by `data.percentCompleted is number`*.
5. **Oversized Headline Attack**: Strategy write with headline > 300 characters to bloat storage. *Result: Denied by `data.headline.size() <= 300`*.
6. **Missing Persona Attack**: Strategy write missing `persona`. *Result: Denied by `data.persona is string`*.
7. **Invalid Chat Role Attack**: Chat message with `role: "admin"` or `role: "system"`. *Result: Denied by `data.role in ['user', 'assistant']`*.
8. **Massive Chat Buffer Overflow Attack**: Chat message with text > 10,000 characters. *Result: Denied by `data.text.size() <= 10000`*.
9. **Missing Chat Text Attack**: Chat message without text field. *Result: Denied by `data.text is string`*.
10. **Arbitrary Collection Write Attack**: Write to `/users/{uid}` or `/system_config/{id}`. *Result: Denied by default-deny catch-all*.
11. **Connection Test Write Attack**: Attempting to write to `/test/{docId}`. *Result: Denied because only `allow read: if true;` is allowed on `/test`*.
12. **Malformed Document ID Attack**: Document ID with spaces, brackets, or control characters. *Result: Denied by regex `^[a-zA-Z0-9_\\-]+$`*.
