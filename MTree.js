/*A tree that contains nodes which have at most branchingFactor children

Works quite well for large amounts of data that needs to be searched through.

Also sorts based on the comparator and can be returned as an array easily

Similatr in function to a K-ary tree although i did not model this off of that so there may be differences*/
function MTree(value, branchingFactor, comparator){
    this.branches = new Array();
    this.val = value;
    this.size = 1;
    var comp = comparator;
    var max;

    if(!comparator){
        comp = Comparator;
    }

    /*insert(value) : insert the value 'value' into this tree in the correct position*/
    this.insert = function (value) {
        this.insertMTree(new MTree(value, branchingFactor));
    }

    /*insertMTree(mTree) : insert the tree 'mTree' into this tree in the correct position*/
    this.insertMTree = function (mT) {
        this.size++;
        if (comp(mT.val, this.val) == 1) {
            var swap = mT.val;
            mT.val = this.val;
            this.val = swap;
        }

        //either its empty 
        // greater then the max
        //or goes somewhere in the center
        if (this.branches.length === 0) {//empty
            this.branches.push(mT);
            max = mT;
        } else if (comp(mT.val, max.val) == 1) {//largest
            if (this.branches.length < branchingFactor) {
                this.branches.push(mT);
                max = mT;
            } else {
                var prev = max;
                max = mT;
                this.branches[this.branches.indexOf(prev)] = mT;
                this.reInsert(prev);
            }
        } else {//goes in the center
            for (var i = 0; i < this.branches.length; i++) {
                var res = comp(mT.val, this.branches[i].val);
                if (this.branches.length < branchingFactor
                && (res == -1 || res == 0)) {
                    this.branches.splice(i, 0, mT); //little slow
                    break;
                } else if (this.branches.length === branchingFactor
                && (res == -1 || res == 0)) {
                    this.branches[i].insertMTree(mT);
                    break;
                }
            }
        }
    }

    this.insertArray = function (array) {
        var dupe = array.slice();
        var place = 0;
        for (var i = 0; i < dupe.length; i++) {
            place = Math.floor((Math.random() * dupe.length));
            this.insert(dupe[place]);
            dupe.splice(place, 0);
        }
    }

    /*search(value) : Is the 'value' contained in this MTree*/
    this.search = function (value) {
        if (comp(value, this.val) == 0) {
            return true;
        } else {
            var res;
            for (var i = 0; i < this.branches.length; i++) {
                res = comp(value, this.branches[i].val);
                if (res == 0 || res == -1) {
                    return this.branches[i].search(value);
                    break;
                }
            }
            return false;
        }
    }

    /*reInsert(mTree) : Insert every value from the tree 'mTree' into this tree*/
    this.reInsert = function (mT) {
		this.size -= mT.size;
        var nodes = mT.toArray();
        for (var i = 0; i < nodes.length; i++) {
            this.insert(nodes[i]);
        }
    }

    /*from(value) : An array of all the elements greater then or equal to 'value'*/
    this.from = function (value) {
        var array = new Array();
        var test = comp(this.val, value);
        var me = test == 1 || test == 0 ? this.val : undefined;
        for (var i = this.branches.length - 1; i >= 0; i--) {
            var res = comp(this.branches[i].val, value)
            if (res == 1 || res == 0) {//this.branches[i].val >= value
                array = (this.branches[i].from(value)).concat(array);
            } else {//this.branches[i].val < value
                array.splice(0, 0, me);
                return array;
            }
        }
        array.splice(0, 0, me);
        return array;
    }

    /*to(value) : An array of all the elements less then or equal to 'value'*/
    this.to = function (value) {
        var array = new Array();
        var test = comp(this.val, value);
        var me = test == -1 || test == 0 ? this.val : undefined;
        for (var i = this.branches.length - 1; i >= 0; i--) {
            var res = comp(this.branches[i].val, value)
            var brAry = this.branches[i].to(value);
            array = (brAry).concat(array);
        }
        if (me) {
            array.push(me);
        }
        return array;
    }

    /*findAllLike(value) : an array of all the elements that are equal to 'value'*/
    this.findAllLike = function (value) {
        var that = this;
        var array = new Array();
        this.iterate(function (val) {
            if (comp(val, value) == 0) {
                array.push(val);
            }
        });
        return array;
    }

    /*iterate(fctn) : apply the function 'fctn' to each of the elements in the tree in ascending order*/
    this.iterate = function (fctn) {
        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].iterate(fctn);
        }
        fctn(this.val);
    }

    /*toArray(direction) : an array filled with all the values in sorted order -1 ascending else descending*/
    this.toArray = function (direction) {
        if (!direction || direction == 1) {//descending
            var array = new Array();
            for (var i = 0; i < this.branches.length; i++) {
                array = this.branches[i].toArray().concat(array);
            }
            array.splice(0, 0, this.val);
            return array;
        } else {//ascending
            var array = new Array();
            for (var i = 0; i < this.branches.length; i++) {
                array = this.branches[i].toArray(-1).concat(array);
            }
            array.splice(0, 0, this.val);
           
            return array;
        }
    }

    /*minimum() : the smallest value contained in this tree*/
    this.minimum = function () {
        if (!this.branches[0]) {
            return this.val;
        } else {
            return branches[0].minimum();
        }
    }
    /*maximum() : the largest value in this tree*/
    this.maximum = function () {
        return this.val;
    }

    this.toString = function () {
        var str = "" + this.val + " ";

        for (var i = this.branches.length - 1; i >= 0; i--) {
            str += this.branches[i].toString();
        }
        return str;
    }
}
/*the standard comparator*/
function Comparator(val1, val2){
    //-1 val1 < val2
    //0 equal
    //+1 val1 > val2

    if (val1 > val2) {
        return 1;
    } else if (val1 < val2) {
        return -1;
    } else { //equal
        return 0;
    }
}
if (typeof module != "undefined") {
    module.exports = MTree;
}