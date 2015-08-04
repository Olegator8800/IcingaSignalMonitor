<?php

use Icinga\Web\Controller;
use Icinga\Application\Icinga;

class SignalMonitor_MonitorController extends Controller
{
    protected $path = array();

    protected $url = null;

    protected function getUrl()
    {
        if ($this->url === null) {
            $this->url = clone $this->getRequest()->getUrl();
        }

        return $this->url;
    }

    protected function moduleInit()
    {
        $moduleManager = Icinga::app()->getModuleManager();
        $modulePath = $moduleManager->getModuleDir($this->moduleName);

        $this->path = array(
                    'module' => $modulePath,
                    'module_public' => $modulePath.'/public',
                    'public' => __DIR__.'/../../../../public',
                    'public_url' => $this->getUrl()->getBaseUrl(),

                );
    }

    public function indexAction()
    {
        $this->redirectNow('/signalmonitor/monitor/show');
    }

    public function showAction()
    {
        $bootstrapPath = $this->path['module_public'].'/index.html';
        $resourcePath = $this->path['public_url'].'/'.$this->moduleName.'_public/';

        $bootstrapContent = file_get_contents($bootstrapPath);
        $bootstrapContent = str_replace('{public_path}', $resourcePath, $bootstrapContent);

        echo $bootstrapContent;
        die;
    }

    public function deployAction()
    {
        $publicPath = realpath($this->path['public']);
        $modulePublicPath = realpath($this->path['module_public']);

        $command = "ln -s {$modulePublicPath} {$publicPath}/{$this->moduleName}_public";

        if (!is_writable($publicPath)) {
            echo 'you need exec: <br/> '.$command;
        } else {
            exec($command);
        }

        die;
    }
}
