var tipCollection = new TipCollection;

function TipModel(obj){
  this.tip = obj.tip;
}

function TipView(model){
  this.model = model;
  this.el = undefined;
}

function TipCollection(){
  this.tips = {};
}

function getTips(){

}
