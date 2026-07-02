Status codes — the simple mental model:
Think of them in families by the first digit:
FamilyMeaningCodes you'll use2xx✅ Success200 OK, 201 Created4xx❌ Client's fault400 Bad input, 401 Not logged in, 403 No permission, 404 Not found5xx💥 Server's fault500 Something crashed
The ones you need right now:

200 — request worked, nothing was created (login, logout, getProfile)
201 — worked AND something new was created in the DB (register)
400 — user sent bad/missing data ("all fields required", "email taken")
404 — the thing they're looking for doesn't exist ("user not found")
500 — your code crashed, not their fault (catch blocks)

