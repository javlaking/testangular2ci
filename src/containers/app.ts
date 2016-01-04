import {Component, View, Inject} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {Counter} from '../components/counter/counter';
import * as CounterActions from '../actions/counter';

@Component({
  selector: 'root'
})
@View({
  directives: [Counter],
  template: `
  <counter [counter]="counter"
    [increment]="increment"
    [decrement]="decrement"
    [incrementIfOdd]="incrementIfOdd"
    [incrementAsync]="incrementAsync">
  </counter>
  `
})
export default class App {

  protected unsubscribe: Function;

  constructor( @Inject('ngRedux') ngRedux) {
    
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      counter: state.counter
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
  }
}