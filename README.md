JavaScript-N-ary-Tree
=====================
This is a tree structure similar to an N-ary tree implementation in javascript. 

Duplicate nodes are allowed.

Core Methods include:
----------------------------------------------------------
  Search for a node
  
  All nodes greater than specified node
  
  All nodes less than specified node
  
  Copy all nodes to array in order based on comparator
  
  Min and max nodes
  
  Iterate over all nodes in the tree in order

Example usage:
----------------------------------------------------------
var mTree = new MTree(5, 7);
 
var array = new Array();

for (var i = 1000; 0 < i; i--) {//1000 random elements

  array.push(Math.floor((Math.random() * 1000)));
    
}

mTree.insertArray(array);

mTree.search(42);
