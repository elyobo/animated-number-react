import React, { Component } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

const target = {
  animatedValue: 0,
};

const defaultFunction = () => {};

class AnimatedNumber extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number,
    formatValue: PropTypes.func,
    begin: PropTypes.func,
    complete: PropTypes.func,
    run: PropTypes.func,
    update: PropTypes.func,
    easing: PropTypes.string,
  };

  static defaultProps = {
    duration: 1000,
    formatValue: value => value,
    easing: 'linear',
    run: defaultFunction,
    complete: defaultFunction,
    update: defaultFunction,
    begin: defaultFunction,
    delay: 0,
  };

  state = {
    animatedValue: 0,
  };

  componentDidMount = () => {
    this.animateValue();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) this.animateValue();
  };

  updateValue = (anima) => {
    this.props.update(anima);
    const { animatedValue } = target;
    this.setState({ animatedValue });
  };

  animateValue = () => {
    const {
      duration, begin, easing, complete, run, delay, value,
    } = this.props;

    anime({
      targets: target,
      animatedValue: value,
      duration,
      update: this.updateValue,
      easing,
      begin,
      complete,
      run,
      delay,
    });
  };

  render() {
    return <span>{this.props.formatValue(Number(this.state.animatedValue))}</span>;
  }
}

export default AnimatedNumber;