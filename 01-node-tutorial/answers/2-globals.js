// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(__dirname)
setInterval( () => {
  console.log('__dirname is :', __dirname)
}, 5000)

console.log(__filename)
setInterval( () => {
  console.log('__filename is :', __filename)
}, 6000)

console.log(require)
setInterval( () => {
  console.log('require is :', require)
}, 7000)

console.log(module)
setInterval( () => {
  console.log('module is :', module)
}, 8000)

console.log(process.env.MY_VAR)
setInterval( () => {
  console.log('this is process.env.MY_VAR : ', process.env.MY_VAR)
}, 9000)