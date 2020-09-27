
export const I32ARRAY = idof <i32[ ]>( );

export function addArray ( data: i32[ ]): i32 {
    data[ 2 ] = data[ 0 ] + data[ 1 ];
    return data.length;
}

export function addOneForArr ( data: i32[ ]): i32 {
    for( let i =0; i < data.length; i++ ) {
        data[ i ] = data[ i ] + 1;
    }
    return data.length;
}

export function arrAdd ( arr1: i32[ ], arr2: i32[ ]): i32[ ] {
    const r: i32[ ] = [ ];
    for( let i =0; i < arr1.length; i++ ) {
        r.push( arr1[ i ] + arr2[ i ])
    }
    return r
}

// 矩阵相加
export function matrixAdd( flattenMat1: i32[ ], flattenMat2: i32[ ]): i32[ ] {
    const r: i32[ ] = [ ];
    for( let i =0; i < flattenMat1.length; i++ ) {
        r[ i ] = flattenMat1[ i ] + flattenMat2[ i ];
    }
    return r;
}

// 矩阵相乘
export function matrixMul( flattenMat1: i32[ ], flattenMat2: i32[ ]): i32[ ] {
    const r: i32[ ] = [ ];
    for( let i =0; i < flattenMat1.length; i++ ) {
        r[ i ] = flattenMat1[ i ] * flattenMat2[ i ];
    }
    return r;
}

// 为一个2维数组，打一个数组布丁
export function polyArrByArr( arr1: i32[ ], arr2: i32[ ], indexArr: i32[ ]): void {
    for ( let i = 0; i < indexArr.length; i++ ) {
        arr1[ indexArr[ i ]] = arr2[ i ];
    }
}

// 寻找区域B在矩阵A中，当在矩阵A变成flateen时的下标列表
export function findPolyMatFlattenIndex ( x: i32, y: i32, scale: i32, mat1Width: i32, mat1Height: i32, mat2Width: i32, mat2Height: i32 ): i32[ ] {
    const result: i32[ ] = [ ];
    for ( let i = 0; i < mat2Height; i++ ) {
        const startLineIndex = (( i + y ) * mat1Width + x ) * scale;
        for ( let j = 0; j < mat2Width * scale; j++ ) {
            result.push( startLineIndex + j );
        }
    }
    return result;
}

export function test( n: i32[ ]): void {
    n[ 2000000 ] = 9;
}