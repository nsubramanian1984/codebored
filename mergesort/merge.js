
var arr1 = [1, 3, 5, 7, 10, 20];
var arr2 = [2, 4, 6, 90];

var iter1 = 0, iter2 = 0;

var size1 = arr1.length;
var size2 = arr2.length;

var arr3 = [];
while(iter1 !== size1 && iter2 !== size2) {
    if(arr1[iter1] < arr2[iter2]) {
        arr3.push(arr1[iter1]);
        iter1++;
    }
    else {
        arr3.push(arr2[iter2]);
        iter2++;
    }
}

if(iter1 !== size1 && iter2 === size2) {
    for(var index = iter1; index < size1; index++)
        arr3.push(arr1[index]);
}
else if(iter1 === size1 && iter2 !== size2) {
    for(var index = iter2; index < size2; index++)
        arr3.push(arr2[index]);
}

console.log(arr3);