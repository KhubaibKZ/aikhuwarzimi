# Architecture rules
- Research participants use a random browser-held capability token, verified by database functions; names are labels, not credentials, so duplicate names cannot share records.
- Research submissions are stored separately from student progress and retained as attempt history; only authenticated admins can read the research cohort.
- Research reuses PastPaperWorkspace with account-progress disabled so signed-in visitors cannot mix participant work into student records.