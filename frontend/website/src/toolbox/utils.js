export function combineArrayNoDuplication(arr1, arr2) {
    var nonDuplicatedArray = []
      for (var i = 0; i < arr1.length; i++) {
        var elementFound = false
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].name === arr2[j].name) {
              elementFound = true;
              break;
          }
        }
        if (!elementFound){
          nonDuplicatedArray.push(arr1[i])
        }
      }
    return nonDuplicatedArray
}