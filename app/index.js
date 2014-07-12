'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
  },
  askFor: function () {
    var done = this.async();
    // replace it with a short and sweet description of your generator
    this.log(chalk.blue.bold('Lets generate a module for Social Foundation.'));

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
        message: "Short description of this module"
      }
      ,
      {
        name: 'namespace',
        message: "Namespace"
      },
      {
        name: 'mainClass',
        message: "Name the main class"
      }

    ];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.prefix = props.prefix;
      this.description = props.description;
      this.namespace = props.namespace;
      this.namespaceFile = this.namespace.replace(/\\/g, '/');
      this.namespaceFileRoot = this.namespaceFile.substring(0, this.namespaceFile.lastIndexOf('/'));
      this.modulekey = (this.prefix+' '+this.moduleName).replace(/\s/g,'_').toLowerCase();
      this.modulefile = (this.moduleName).replace(/\s/g,'-').toLowerCase();
      this.pluginkey= (this.prefix+' '+this.moduleName).replace(/\s/g,'-').toLowerCase();
      this.namespaceroot = this.namespace.replace(/\\/g,'\\\\');
      this.mainClass = props.mainClass;
      this.url = '';
      done();
    }.bind(this));
  },
  generateApp: function () {
    var folders = this.namespace.replace(/\\/gm,'/');
    this.mkdir('lib/'+folders+'/');
    this.mkdir('assets');
    this.template('init.php.tpl','init.php');
    this.template('module.js.tpl','assets/'+this.modulefile+'.js');
    this.template('module.styl.tpl','assets/'+this.modulefile+'.styl');
    this.template('main.php.tpl','lib/'+folders+'/'+this.mainClass+'.php');
  }
});

module.exports = ModuleGenerator;