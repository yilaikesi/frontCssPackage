/**
 * @des 余弦相似度计算:小于0.4  欧氏距离 > 120 可以认为相似
 * @param {*} param_a
 * @param {*} param_b
 * @param {*} param_depth
 */
function cosine_similarity(param_a, param_b, param_depth) {
	// 求点积
	let plus_sum = 0;
	for (let i = 0; i < param_depth; i++) {
		let tempAB = param_a[i] * param_b[i];
		plus_sum += tempAB;
	}
	// 求 A 模长
	let paramA_temp_length = 0;
	for (let i = 0; i < param_depth; i++) {
		paramA_temp_length += Math.pow(param_a[i], 2);
	}
	let paramA_length = Math.pow(paramA_temp_length, 0.5);

	// 求 B 模长
	let paramB_temp_length = 0;
	for (let i = 0; i < param_depth; i++) {
		paramB_temp_length += Math.pow(param_b[i], 2);
	}
	let paramB_length = Math.pow(paramB_temp_length, 0.5);
	let result = plus_sum / (paramA_length * paramB_length);
	return result;
}

let a = [2, 1];
let b = [3, 3];
let c = [1, 5];
let d = 2;

console.log(cosine_similarity(a, b, 2));


/**
 * @des 求夹角
 * @param {*} point1 
 * @param {*} point2 
 * @param {*} point3 
 * @returns 
 */
function countAngle(point1,point2,point3){
    // 1.先求 point1 和point2之间的距离
    let temp12  =  Math.pow((point1[0]-point2[0]),2)+  Math.pow((point1[1]-point2[1]),2) +Math.pow((point1[2]-point2[2]),2)
    let point12 = Math.pow(temp12,0.5)
    // console.log(point12)
    let temp23  =  Math.pow((point3[0]-point2[0]),2)+  Math.pow((point3[1]-point2[1]),2) +Math.pow((point3[2]-point2[2]),2)
    let point23 = Math.pow(temp23,0.5)
    // console.log(point23)

    // 2.求向量 
    let vector12 = [(point1[0]-point2[0]),(point1[1]-point2[1]),(point1[2]-point2[2])]
    let vector23 = [(point3[0]-point2[0]),(point3[1]-point2[1]),(point3[2]-point2[2])]
    
    
    //3.求arccos 
    let top = vector12[0] * vector23[0] + vector12[1] * vector23[1] + vector12[2] * vector23[2]
    let bottom = point12 * point23

    // 4.最后求解
    console.log(Math.acos(top / bottom))
    return Math.acos(top / bottom)* 180 / Math.PI
}

let point1 = [0,0,0]
let point2 = [0,1,0]
let point3 = [0,1,1]

countAngle(point1,point2,point3)
