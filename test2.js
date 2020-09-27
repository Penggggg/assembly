const fs = require("fs")
const np = require('jsnumpy');
const loader = require("@assemblyscript/loader")

const wasm = loader.instantiateSync(
  fs.readFileSync("./build/optimized.wasm"),
  { }
)

// 一维度数组转换为矩阵（3维数组）
const transferArrToMat = ( row, col, num, arr ) => {

  // 装最里面元素的数组
  let metaArr = [ ];

  // 装元素的数组
  let colArr = [ ];

  // 装col的数组
  const rowArr = [ ];

  // 遍历一维度数组
  arr.map(( mata, key ) => {

      // 装元素
      if ( metaArr.length < num ) {
          metaArr.push( mata );
      }

      if ( metaArr.length === num ) {
          colArr.push([ ...metaArr ]);
          metaArr = [ ];
      }

      // 装row
      if ( colArr.length === col ) {
          rowArr.push([ ...colArr ]);
          colArr = [ ];
      }
  });

  return rowArr;

}

// 为一个2维数组，打一个数组布丁
const polyMatByMat = ( x, y, mat, polyMat ) => {
    for ( let j = 0; j < polyMat.length; j++ ) {
        for ( let i = 0; i < polyMat[ j ].length; i++ ) {
            mat[ j + y ][ i + x ] = polyMat[ j ][ i ];
        }
    }
    return mat;
}

const { 
    __allocArray, __retain, __getArray, __release,
    I32ARRAY, test,
    addArray, addOneForArr, arrAdd, matrixAdd, matrixMul, polyArrByArr, findPolyMatFlattenIndex
} = wasm;

/** ================== test =========== */
// const ar = [0,1,2]
// const ptr = __retain( __allocArray( I32ARRAY, ar ))
// test( ptr );
// console.log( __getArray( ptr ));

/** ================== addArray =========== */

// const arr = [ 1, 2, 0 ];
// var ptrArr = __retain( __allocArray( I32ARRAY, arr ));
// const r = addArray( ptrArr );
// console.log('result:', __getArray( ptrArr ), r );


/** ================== addOneForArr =========== */

// const arr2 = [ 1, 2, 3 ];
// var ptrArr2 = __retain( __allocArray( I32ARRAY, arr2 ));
// const r2 = addOneForArr( ptrArr2 );
// console.log('result:', __getArray( ptrArr2 ), r2 );


/** ================== arrAdd =========== */

// const arr31 = [ 1, 2, 3 ];
// const arr32 = [ 4, 6, 7 ];
// var ptrArr31 = __retain( __allocArray( I32ARRAY, arr31 ));
// var ptrArr32 = __retain( __allocArray( I32ARRAY, arr32 ));
// const r3 = arrAdd( ptrArr31, ptrArr32 );
// console.log('result:', __getArray( r3 ) );


/** ================== numpy test =========== */

// const n1 = [
//   [[1,2,3],[4,5,6]],
//   [[7,8,9],[10,11,12]]
// ]

// const n2 = [
//   [[13,14,15],[16,17,18]],
//   [[19,20,21],[22,23,24]]
// ]

// const rn1 = np.add( n1, n2 );
// const rn2 = np.multiply( n1, n2 );

// console.log( rn1 )
// console.log( rn2 )

/** ================== matrixAdd =========== */

// const ptrArr1 = __retain( __allocArray( I32ARRAY, np.flatten( n1 )));
// const ptrArr2 = __retain( __allocArray( I32ARRAY, np.flatten( n2 )));

// const r = matrixAdd( ptrArr1, ptrArr2 );
// const a = __getArray( r )
// const m = transferArrToMat( 2, 2, 3, a );

// console.log( m );

/** ================== matrixMul =========== */

// const ptrArr1 = __retain( __allocArray( I32ARRAY, np.flatten( n1 )));
// const ptrArr2 = __retain( __allocArray( I32ARRAY, np.flatten( n2 )));

// const r = matrixMul( ptrArr1, ptrArr2 );
// const a = __getArray( r )
// const m = transferArrToMat( 2, 2, 3, a );


// __release( r );
// console.log( m );

/** ================= polyMatByMat ============ */


// const aa = [
//     [[1,2,3],[4,5,6],[7,8,9],[10,11,12]],
//     [[13,14,15],[16,17,18],[19,20,21],[22,23,24]],
//     [[25,26,27],[28,29,30],[31,32,33],[34,35,36]],
//     [[37,38,39],[40,41,42],[43,44,45],[46,47,48]]
// ]

// const bb = [
//     [[77,88,99],[77,88,99]],
//     [[77,88,99],[77,88,99]]
// ]

// console.log( polyMatByMat( 1, 1, aa, bb ));


// const ptrArr1 = __retain( __allocArray( I32ARRAY, np.flatten( aa )));
// const ptrArr2 = __retain( __allocArray( I32ARRAY, np.flatten( bb )));

// const ptrIndexArr = wasm.findPolyMatFlattenIndex( 1, 1, 3, 4, 4, 2, 2 );

// polyArrByArr( ptrArr1, ptrArr2, wasm.ptrIndexArr );

// const arr = __getArray( ptrArr1 );

// console.log( __getArray( ptrIndexArr ));
// console.log( transferArrToMat( 4, 4, 3, arr ))



/** ============= findPolyMatFlattenIndex ============== */

// const a = wasm.findPolyMatFlattenIndex( 0, 0, 3, 4, 4, 2, 2 );
// const b = wasm.findPolyMatFlattenIndex( 1, 1, 3, 4, 4, 2, 2 );

// console.log( __getArray( a ), __getArray( a ).length / 3 )
// console.log( __getArray( b ), __getArray( b ).length / 3 )


 