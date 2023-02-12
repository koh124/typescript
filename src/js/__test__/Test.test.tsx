import renderer from 'react-test-renderer';
import Test from '../components/Test';
import React from 'react';

test('check', () => {
  console.log('OK');
})

// 一般的なjestのテスト
describe('test tutorial', () => {
  test('test1', () => {
    expect(1+2).toBe(3);
  })
})

// jest with Reactのスナップショットテスト
describe('snapshot-test tutorial', () => {
  test('test2', () => {
    const tree = renderer
    .create(<Test />)
    .toJSON(); // テスト対象のコンポーネントをレンダリングしたものをJSON化
    expect(tree).toMatchSnapshot();
  })
})

