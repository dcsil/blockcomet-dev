function helloWorld(){
  return "hello world"
}

test('test hello world', () => {
  expect(helloWorld()).toEqual("hello world");
});
