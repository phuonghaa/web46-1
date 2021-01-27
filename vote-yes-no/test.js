var searchInsert = function(nums, target) {
    if (target < nums[0]) return 0
    else if (target > nums[nums.length-1]) return nums.length
    
    for (let i = 0; i < nums.length; i++){
        if (nums[i] === target || nums[i] > target) {
            return i
        }
    }
    
};

let a = searchInsert([1,3,5,6], 2)
console.log(a);
