export default [
  {
    label: '1/8',
    value: 0.125
  }, {
    label: '1/4',
    value: 0.25
  }, {
    label: '1/2',
    value: 0.5
  }, {
    label: '1',
    value: 1
  }, {
    label: '2',
    value: 2
  }, {
    label: '4',
    value: 4
  }, {
    label: '8',
    value: 8
  }
].sort((a, b) => {
  // Ensure we're sorted since we use the first and
  // last index to determine range
  if (a.value === b.value) {
    return 0;
  }
  return a.value > b.value ? 1 : -1;
});
