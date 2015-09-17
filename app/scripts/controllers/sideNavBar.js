'use strict';

angular.module('angularTestApp').controller('SideNavBarCtrl', function ($scope,$http, $location,iconClassMapping,appUtils) {
    $scope.iconClassMapping=iconClassMapping;
    $scope.toggleMenu=function(obj,value,$event){
       obj.collapse=!value;
    }
    $http.get('/getSidebarMenuList').success(function(dataResponse,status,headers,config){
        //success
        console.log("dataResponse",dataResponse);
        appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            $scope.menu=dataResponse.responseData;
        });

    }).error(function(data,status,headers,config){
        //error
        console.log("Error",data,status,headers,config);
    });

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };
     	$scope.menu = [
        {
          link : '',
          title: 'Dashboard',
          icon: 'dashboard'
        },
        {
          link : '',
          title: 'Friends',
          icon: 'group'
        },
        {
          link : '',
          title: 'Messages',
          icon: 'message'
        }
      ];
      $scope.admin = [
        {
          link : '',
          title: 'Trash',
          icon: 'delete'
        },
        {
          link : 'showListBottomSheet($event)',
          title: 'Settings',
          icon: 'settings'
        },
        {
            link : '',
            title: 'Trash',
            icon: 'delete'
          },
          {
            link : 'showListBottomSheet($event)',
            title: 'Settings',
            icon: 'settings'
          },{
              link : '',
              title: 'Trash',
              icon: 'delete'
            },
            {
              link : 'showListBottomSheet($event)',
              title: 'Settings',
              icon: 'settings'
            }
      ];
     


});