<?php
namespace <%= namespace %>;

use CLMVC\Core\Container;
use CLMVC\Core\Includes\FrontInclude;
use CLMVC\Core\Includes\ScriptIncludes;
use CLMVC\Core\Includes\StyleIncludes;
use CLMVC\Helpers\Http;
use SocialFoundation\Core\ModuleBase;

class <%= mainClass %> extends ModuleBase {
    protected function init() {
        $this->getOptions()->get('route')->setDefaultValue('example');
        if (Http::get_current_page() == $this->getOption('route')) {
            $this->setup();
        } elseif (is_admin()) {
            $this->setupAdmin();
        }
    }

    /**
     * Setups the option
     * @param $options
     * @return mixed
     */
    public function routesOptions($options) {
        $options[$this->getOptionNameSpace()][] = ['label' => __('Example page'),'key' => 'route', 'value' => $this->getOption('route')];
        return $options;
    }
    private function setupAdmin() {
        $this->setupRouting();
    }
    private function setupRouting() {
        $container = Container::instance();
        /**
         * @var \CLMVC\Core\Http\Routes $routes
         */
        $routes = $container->fetch('Routes');
        //$routes->add("/".$this->getOption('route')."/", array('<%= namespaceFile %>/Controllers/<%= mainClass %>Controller', 'index'), array(), 'get');
    }

    private function setup() {
        ScriptIncludes::instance()
            ->register(new FrontInclude('<%= pluginkey %>-handling', <%= modulekey %>_assets_url('<%= modulefile %>.js'), array('jquery')));
        StyleIncludes::instance()
            ->register(new FrontInclude('<%= pluginkey %>', <%= modulekey %>_assets_url('<%= modulefile %>.css')));

        ScriptIncludes::instance()->enqueue('frontend', '<%= pluginkey %>-handling')
            ->enqueue('frontend', 'js-infield-label')
            ->enqueue('frontend', 'js-validation');
        add_action('wp_enqueue_scripts', function() {
            $params = array(
                'example' =>
                    array(
                        'key' => __('Example string', '<%= pluginkey %>')
                    )
            );
            wp_localize_script( '<%= pluginkey %>-handling', '<%= modulekey %>', $params );
        });
    }

    /**
     * The namespace of the options for this module.
     * @return mixed
     */
    protected function getOptionNameSpace() {
        return '<%= pluginkey %>';
    }

    public static function activate() {
    }
    public static function deactivate() {
    }
}
