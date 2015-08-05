<?php

use Icinga\Web\Controller;
use Icinga\Application\Icinga;
use Icinga\Module\Monitoring\Backend\MonitoringBackend as Backend;

class SignalMonitor_ApiController extends Controller
{

    protected $backend = null;



    protected function moduleInit()
    {
        $this->backend = Backend::createBackend(/*$this->_getParam('backend')*/);
    }

    public function indexAction()
    {
        die('index api');
    }

    public function listAction()
    {
        $hosts = array();

        $columns = array(
                'host_name',
                'host_display_name',
                'host_state',
                'host_state_type',
                'host_last_state_change',
                'host_address',
            );

        $hostsResult = $this->backend->select()->from('hoststatus', $columns);

        foreach ($hostsResult as $host) {
            $hosts[$host->host_name] = array(
                        'name' => $host->host_name,
                        'state' => $host->host_state,
                        'address' => $host->host_address,
                        'last_change' => $host->host_last_state_change,
                        'service' => array(),
                    );
        }

        $stateColumn = 'host_state';
        $stateChangeColumn = 'host_state';

        $columns = array(
            'host_name',
            'service_display_name',
            'service_description',
            'service_state' => $stateColumn,
            'service_in_downtime',
            'service_acknowledged',
            'service_output',
            'service_last_state_change' => $stateChangeColumn,
            'service_icon_image',
            'service_state_type',
            'service_severity',
            'service_last_check',
            'service_notifications_enabled',
            'service_last_comment',
            'service_last_ack',
            'service_last_downtime',
        );

        $servicesResult = $this->backend->select()->from('servicestatus', $columns);

        foreach ($servicesResult as $service) {

            $hostName = $service->host_name;

            if (!isset($hosts[$hostName])) {
                continue;
            }

            $serviceStatus = array(
                            'name' => $service->service_display_name,
                            'state' => $service->service_state,
                            'output' => $service->service_output,
                            'description' => $service->service_description,
                        );

            $hosts[$hostName]['service'][] = $serviceStatus;
        }

        echo json_encode($hosts);
        die;
    }
}
