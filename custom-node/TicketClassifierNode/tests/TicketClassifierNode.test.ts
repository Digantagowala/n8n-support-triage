function classify(subject: string, message: string) {
  const text = (subject + ' ' + message).toLowerCase();
  let category = 'general', priority = 'low', tags: string[] = [];
  let reason = 'Koi keyword match nahi hua — fallback to general/low';

  if (/refund|invoice|charge|payment|billing|subscription|overcharged/.test(text)) {
    category = 'billing'; priority = 'high';
    const match = text.match(/refund|invoice|charge|payment|billing|subscription|overcharged/);
    tags = match ? [match[0]] : [];
    reason = `Matched keyword: ${tags[0]}`;
  } else if (/crash|error|broken|not working|bug|fail|exception|500|down/.test(text)) {
    category = 'bug'; priority = 'high';
    const match = text.match(/crash|error|broken|not working|bug|fail|exception|500|down/);
    tags = match ? [match[0]] : [];
    reason = `Matched keyword: ${tags[0]}`;
  } else if (/feature|suggest|request|would be nice|enhancement/.test(text)) {
    category = 'feature_request'; priority = 'medium';
    const match = text.match(/feature|suggest|request|would be nice|enhancement/);
    tags = match ? [match[0]] : [];
    reason = `Matched keyword: ${tags[0]}`;
  }
  return { category, priority, tags, reason };
}

test('billing/high — refund keyword', () => {
  const r = classify('Refund request', 'Mujhe apne last invoice ka refund chahiye');
  expect(r.category).toBe('billing');
  expect(r.priority).toBe('high');
  expect(r.tags).toContain('refund');
});

test('general/low — koi keyword nahi', () => {
  const r = classify('Hello', 'Bas ek general question tha');
  expect(r.category).toBe('general');
  expect(r.priority).toBe('low');
});

test('bug/high — crash keyword', () => {
  const r = classify('App crash', 'Login pe crash ho rahi hai');
  expect(r.category).toBe('bug');
  expect(r.priority).toBe('high');
});