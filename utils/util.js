const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const combination = function (arr, size) {
  var r = []
  function recursion(t, a, n) {
    if (n === 0) {
      r[r.length] = t
      return
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i])
      recursion(b, a.slice(i + 1), n - 1)
    }
  }
  recursion([], arr, size)
  return r;
}


function permutationAndCombination(source = [], selectedLimit, isPermutation = true) {
  if (!Array.isArray(source)) return source

  // remove duplicated item
  source = [...new Set(source)]
  selectedLimit = selectedLimit || source.length

  const result = []
  const sourceLen = source.length

  selectedLimit = selectedLimit > sourceLen ? sourceLen : selectedLimit

  const innerLoop = (prefix = [], done = [], index = 0) => {
    const prefixLen = prefix.length

    for (let i = isPermutation ? 0 : index; i < sourceLen; i++) {

      if (prefixLen > selectedLimit - 1) break

      // Optimization: Continue to next cycle if current item has be already used for 'prefix'.
      if (done.includes(i)) continue

      const item = source[i]
      const newItem = [...prefix, item]

      if (prefixLen === selectedLimit - 1) {
        result.push(newItem)
      }

      if (prefixLen < selectedLimit - 1) {
        innerLoop(newItem, [...done, i], index++)
      }

    }
  }

  if (source.length) {

    // there is only one case if we want to select all items from source by combination.
    if (!isPermutation && selectedLimit === sourceLen) {
      return source
    }

    innerLoop()
  }

  return result
}



export {
  formatTime,
  combination,
  permutationAndCombination
}
