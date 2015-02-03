'use strict';

var React = require('react');

var LayeredComponentMixin = require('../lib/mixins/LayeredComponentMixin');
var PreventSelectionMixin = require('../lib/mixins/PreventSelectionMixin');
var Floater = require('./Floater.react');

var DropdownMenuButton = React.createClass({

  mixins: [PreventSelectionMixin, LayeredComponentMixin],

  propTypes: {
    label: React.PropTypes.string,
    labelHtml: React.PropTypes.string,
    isRequired: React.PropTypes.bool,
    loading: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: null,
      labelHtml: null,
      isValueButton: false
    }
  },

  getInitialState: function() {
    return {
      open: false
    };
  },

  componentWillUnmount: function() {
  },

  componentDidUpdate: function(prevProps, prevState) {
  },

  renderLayer: function(props) {
    return this.state.open ? (
      <Floater
        parentRef={this.refs.button}
        open={true}
        offsetY={-3}
        placement={['bottom', 'left']}
        captureFormEnter={true}
        onHide={this._handleClose}
        className='dropdown_menu_button_floater'
        zIndex={props.zIndex}>
        <div className='dropdown_menu_button_dropdown'>
          {this.props.children}
        </div>
      </Floater>
    ) : null;
  },

  render: function() {
    return (
      <a ref='button'
        className={'dropdown_menu_button' + (this.props.isValueButton ? ' dropdown_menu_value_button' : '')}
        href='#'
        data-loading={this.props.loading}
        data-open={this.state.open}
        onClick={this._handleClick}
        onMouseDown={this._handleMouseDown}
        onTouchStart={this._handleMouseDown}>
        <span className='dropdown_menu_button_content'>
          <span className='dropdown_menu_button_content_label'>
            {
              this.props.loading ?
                <span className='dropdown_menu_button_content_label_text'><span/></span>
              :
              this.props.labelHtml ?
                <span className='dropdown_menu_button_content_label_text'>
                  <span dangerouslySetInnerHTML={{__html: this.props.labelHtml}}/>
                </span>
                :
                (this.props.label && this.props.label.length > 0) ?
                  <span className='dropdown_menu_button_content_label_text'>{this.props.label}</span>
                  :
                  <span className='dropdown_menu_button_content_label_text'>&nbsp;</span>
            }
          </span>
          <span className='dropdown_menu_button_content_arrow'><span/></span>
        </span>
      </a>
    );
  },

  close: function() {
    if (this.isMounted()) {
      this.setState({open: false});
    }
  },

  _handleClose: function() {
    this.close();
  },

  _handleClick: function(event) {
    event.preventDefault();
    event.stopPropagation();
      },

  _handleMouseDown: function(event) {
    if (!this.props.loading) {
      this._toggleOpen();
    }
  },

  _toggleOpen: function(event) {
    this.setState({open: !this.state.open});
  }

});

module.exports = DropdownMenuButton;
