import { Type, StaticDecode, Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const Recursion = Type.Recursive(Self => Type.Object({
  id: Type.String(),
  children: Type.Transform(
    Type.Array(Self)
  ).Decode((v/*inferred as never[];*/) => v).Encode(v => v),
}));

type Recursion = StaticDecode<typeof Recursion>;

const r: {children: never[]} = Value.Decode(Recursion, {
  children: [
    { children: [] },
    { children: [{ children: [] }] },
  ],
});

function test(node: Recursion) {
  const a: never[] = node.children[0];
  // @ts-expect-error
  const b = node.children[0].children[0].id;
}

const Recursion2 = Type.Recursive(Self => Type.Object({
  id: Type.String(),
  children: Type.Array(Self),
}));

type Recursion2 = StaticDecode<typeof Recursion2>;

function test2(node: Recursion2) {
  const a: string = node.children[0].children[0].id;
}

const Recursion3 = Type.Recursive(Self => Type.Object({
  id: Type.String(),
  child: Self,
}));

type Recursion3 = StaticDecode<typeof Recursion3>;

function test3(node: Recursion3) {
  const a = node.child.child.id;
}

const Recursion4 = Type.Recursive(This => Type.Object({    // const Node = {
  id: Type.String(),
  nodes: Type.Array(This)
}), { $id: 'Node' })

type Node = StaticDecode<typeof Recursion4>

function test4(node: Node) {
  const id = node.nodes[0].nodes[0].id
}

