'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.controller = this.name;
    this.actions=[];
    this.jsonactions=[];
    console.log('You called the controller subgenerator with the argument ' + this.name + '.');
  },
  askFor: function () {
    var done = this.async();
    // replace it with a short and sweet description of your generator
    this.log(chalk.blue.bold('Lets generate a controller for a Social Foundation module.'));


    var prompts = [
      {
        name: 'moduleName',
        message: 'Name of the module?'
      }
      ,
      {
        name: 'prefix',
        message: "Which prefix should be used?"
      }
      ,
      {
        name: 'description',
        message: "Write a short description of this controller"
      }
      ,
      {
        name: 'namespace',
        message: "Which namespace should be used?"
      }
    ];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.prefix = props.prefix;
      this.description = props.description;
      this.namespace = props.namespace;
      this.namespacefile = this.namespace.replace(/\\/g, '\\\\');
      this.modulekey = (this.prefix+' '+this.moduleName).replace(/\s/g,'_').toLowerCase();
      this.pluginkey= (this.prefix+' '+this.moduleName).replace(/\s/g,'-').toLowerCase();
      this.namespaceroot = this.namespace.substring(0,this.namespace.lastIndexOf('\\\\')).replace(/\\\\/g,'/');
      this.mainClass = this.moduleName.replace(/\s/g,'');
      done();
    }.bind(this));
  },
  askForActions: function(){
    var done = this.async(), actions=this.actions, that=this;
    var genActions = [
      {
        type: 'confirm',
        name: 'genActions',
        message: "Generate standard actions?",
        default: false
      }, {
        type: 'checkbox',
        name: 'viewType',
        message: "Which type of view setup should be used?",
        choices: [
          {
            name:'View per action',
            value:'perActionView',
            checked:false
          },
          {
            name:'Template per action',
            value:'perActionTemplate',
            checked:true
          }
        ]
      }, {
        when: function (answers) {
          return answers.viewType.indexOf('perActionTemplate') !== -1;
        },
        name: 'mainAction',
        message: 'Write action that will be the main one'
      }
    ];
    var action = [
      { name:'action',
        message:'Name of action'
      }
      ,      {
        type: 'confirm',
        name: 'genMoreActions',
        message: "More?",
        default: true
      }
    ];
    var setAction = function() {
      that.prompt(action, function (props) {
        that.actions.push(props.action);
        if(props.genMoreActions) {
          setAction();
        }else{
          done();
        }
      }.bind(that));
    };
    this.prompt(genActions, function (props) {
      this.viewType=props.viewType;
      this.mainAction=props.mainAction;
      if (props.genActions) {
        setAction();
      } else {
        done();
      }
    }.bind(this));
  },
  askForJSONActions: function(){
    var done = this.async(), that=this;
    var genActions = [      {
      type: 'confirm',
      name: 'genActions',
      message: "Generate JSON returning actions?",
      default: false
    }];
    var action = [
      { name:'action',
        message:'Name of action'
      },      {
        type: 'confirm',
        name: 'genMoreActions',
        message: "More?",
        default: true
      }
    ];
    var setAction = function() {
      that.prompt(action, function (props) {
        that.jsonactions.push(props.action);
        if(props.genMoreActions) {
          setAction();
        }else{
          done();
        }
      }.bind(that));
    };
    this.prompt(genActions, function (props) {
      if (props.genActions) {
        setAction();
      } else {
        done();
      }
    }.bind(this));
  },

  generateController: function () {
    var folders = this.namespace.replace(/\\/gm,'/');
    console.log(this.viewType);
    console.log(this.mainAction);
    this.mkdir('lib/'+folders+'/');
    this.mkdir('assets');

    this.template('Controller.tpl','lib/'+folders+'/'+this.controller+'Controller.php');
  }
});

module.exports = ControllerGenerator;