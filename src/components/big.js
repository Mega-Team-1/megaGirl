import k from '../../kaboom';

export default function big() {
  let isBig = false;
  
  return {
    isBig() {
      return isBig;
    },
    biggify() {
      this.scale.x = 1.5;
      this.scale.y = 1.5;
      isBig = true;
    },
    smallify() {
      this.scale.x = 1;
      this.scale.y = 1;
      isBig = false;
    }
  }
}