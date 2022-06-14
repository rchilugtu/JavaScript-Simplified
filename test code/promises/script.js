Promise.all([
  Promise.resolve("1"),
  Promise.resolve("2"),
  Promise.reject("3")
]).then(messages => {
  console.log(messages);
}).catch(messages => {
  console.error(messages);
})