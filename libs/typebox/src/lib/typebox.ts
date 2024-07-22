import { Type, StaticDecode } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const Recursion = Type.Recursive(Self => Type.Object({
  children: Type.Transform(
    Type.Array(Self)
  ).Decode((v: never[]/*inferred as never[]; I just set it here for explicit reporting*/) => v).Encode(v => v),
}));

type Recursion = StaticDecode<typeof Recursion>;

const r: {children: never[]} = Value.Decode(Recursion, {
  children: [
    { children: [] },
    { children: [{ children: [] }] },
  ],
});
