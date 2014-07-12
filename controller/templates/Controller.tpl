<?php
namespace <%= namespace %>;

use CLMVC\Controllers\BaseController;
use SocialFoundation\Controllers\Filters\MemberFilter;

/**
* Class <%= controller%>Controller
*
* <%= description %>
*
* @package <%= namespace %>
*/
class <%= controller %>Controller extends BaseController {
    function onControllerPreInit() {
        $this->addFilter('init', new MemberFilter());
        $this->viewpath = <%= modulekey %>_viewpath();
        $this->bag['title'] = '<%= modulekey %>';
    }
    <% _.each(actions, function(action){ %>
    public function <%= action %>() {
        $this->bag['data'] = [];
    }<% }) %>
    <% _.each(jsonactions, function(action){ %>
    public function <%= action %>() {
        $this->renderer->RenderJSON([]);
    }<% }) %>
}