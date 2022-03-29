export function hierarchize(list, parent) {
  list.forEach(item => {
    item.parent = parent;
    if (item.children) hierarchize(item.children, item);
  });
}

// hierarchize and clone nodes
// export function hierarchize(list, parent) {
//   return list.map(item => {
//     const { children, ...props } = { item };
//     const node = { ...props, parent };
//     node.children = children ? hierarchize(children, node) : undefined;
//     return node;
//   });
// }

export function findNode(treeList, callback) {
  for (let item of treeList) {
    if (callback(item)) return item;
    else if (item.children) {
      let found = findNode(item.children, callback);
      if (found) return found;
    }
  }
  return null;
}

export function getParents(node, parents = []) {
  const nodes = [node, ...parents];
  if (node.parent) return getParents(node.parent, nodes);
  return nodes;
}

export function findNodePaths(treeList, callback) {
  const found = findNode(treeList, callback);
  return found ? getParents(found) : [];
}
