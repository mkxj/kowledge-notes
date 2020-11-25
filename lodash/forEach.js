import arrayEach from './.internal/arrayEach.js'
import baseEach from './.internal/baseEach.js'


function forEach(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEach : baseEach
  return func(collection, iteratee)
}

function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}

function baseEach(collection, iteratee) {
  if (collection == null) {
    return collection
  }
  if (!isArrayLike(collection)) {
    return baseForOwn(collection, iteratee)
  }
  const length = collection.length
  const iterable = Object(collection)
  let index = -1

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break
    }
  }
  return collection
}

forEach([1, 2], (x) => console.log(x))