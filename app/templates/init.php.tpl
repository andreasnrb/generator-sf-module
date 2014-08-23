<?php
/*
Plugin Name: Social Foundation - <%= moduleName %>
Plugin URI: <%= url %>
Description: <%= description %>
Version: 14.4.5
Author: Andreas Nurbo
Author URI: http://artofwp.com/
*/

use CLMVC\Core\Options;
use CLMVC\Events\Hook;
Hook::register('social-foundation-init', '<%= modulekey %>_init');

/**
* Registers module and module loader, namespace.
*/
function <%= modulekey%>_init() {
    global $classLoader;
    $classLoader->registerNamespace('<%= namespaceroot %>' ,__DIR__ . '/lib/<%= namespaceFileRoot %>');
    $classLoader->register();
    SocialFoundation\Core\Modules::instance()->register('<%= pluginkey %>', '<%= namespace %>\<%= mainClass %>',
        '<%= modulekey %>_loader');

}

/**
* Checks if the module should be loaded
* @return bool
*/
function <%= modulekey %>_loader() {
    return true;
}

/**
* Returns the URL to module related assets
*
* @param string $path
* @return string
*/
function <%= modulekey %>_assets_url($path) {
    return plugins_url('/assets/' . $path, '<%= pluginkey %>/init.php');
}

/**
* Returns the path to where module related views are located
* @return string
*/
function <%= modulekey %>_viewpath() {
    return __DIR__ . '/assets/';
}


register_activation_hook( '<%= pluginkey %>/init.php',
    function () {
        <%= modulekey %>_init();
        \<%= namespace %>\<%= mainClass %>::activate();
    }
);

register_deactivation_hook( '<%= pluginkey %>/init.php',
    function () {
        <%= modulekey %>_init();
        \<%= namespace %>\<%= mainClass %>::deactivate();
    }
);
