const { formatDate } = require('../src/Utils/utils');

describe('Test formatDate()', () => {
  it('should return elapsed time between a given date and now as "just now" if in seconds', () => {
    const timeIn = '2020-12-30T09:13:27.753Z';
    const expectedOutput = 'just now';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 minute (singular)', () => {
    const timeIn = '2020-12-30T09:11:27.753Z';
    const expectedOutput = '1 minute ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now in minutes (plural)', () => {
    const timeIn = '2020-12-30T09:10:27.753Z';
    const expectedOutput = '2 minutes ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 hour', () => {
    const timeIn = '2020-12-30T07:48:27.753Z';
    const expectedOutput = '1 hour ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 23 hours (plural', () => {
    const timeIn = '2020-12-29T09:48:27.753Z';
    const expectedOutput = '23 hours ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now in days', () => {
    const timeIn = '2020-12-29T08:48:27.753Z';
    const expectedOutput = '1 day ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now in days', () => {
    const timeIn = '2020-12-24T08:48:27.753Z';
    const expectedOutput = '6 days ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 week', () => {
    const timeIn = '2020-12-23T06:48:27.753Z';
    const expectedOutput = '1 week ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 month', () => {
    const timeIn = '2020-11-30T06:48:27.753Z';
    const expectedOutput = '1 month ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 11 months', () => {
    const timeIn = '2020-01-30T06:48:27.753Z';
    const expectedOutput = '11 months ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 year', () => {
    const timeIn = '2019-12-30T06:48:27.753Z';
    const expectedOutput = '1 year ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should return elapsed time between a given date and now as 1 year', () => {
    const timeIn = '2017-12-30T06:48:27.753Z';
    const expectedOutput = '3 years ago';
    const actualOutput = formatDate(timeIn);
    console.log(actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
