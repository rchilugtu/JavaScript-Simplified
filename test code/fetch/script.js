fetch('http://jsonplaceholder.typicode.com/users')
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data.map(user => user.name));
  })


async function doStuff() {
  const res = await fetch('http://jsonplaceholder.typicode.com/users')
  const data = await res.json()
  console.log(object);
}