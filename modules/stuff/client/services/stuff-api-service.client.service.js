(function () {
	'use strict';

	angular
		.module('stuff')
		.factory('stuffService', stuffService);

	stuffService.$inject = ['$http'];

	function stuffService($http) {
		/*
		* Get currently logged in user's stuff
		* @param string param Can be either a string for slug or an integer for skip
		*/
		function getStuff(param) {
			if (angular.isUndefined(param))
				param = '';

			return $http.get('/api/users/stuff/' + param);
		}

		/*
		* Add new stuff to currently logged in user's stuff
		* @param array stuff Stuff parameters
		* @param string slug
		*/
		function addStuff(stuff) {
			return $http.post('/api/users/stuff', stuff);
		}

		/*
		* Update details of user's stuff (trait) by its slug
		* @param string slug Slug of user's stuff
		* @param array params User's stuff data
		*/
		function updateStuff(slug, params) {
			return $http.put('/api/users/stuff/' + slug, params);
		}

		/*
		* Remove user's stuff by its slug
		* @param string slug Slug of user's stuff
		*/
		function deleteStuff(slug) {
			return $http.delete('/api/users/stuff/' + slug);
		}

		/*
		* Stuff autocomplete: find stuff by partial/complete name
		* @param string name Partial/complete name of stuff
		* @param array userData User preferences, location and search radius
		*/
		function findStuff(name, userData) {
			return $http.post('/api/stuff/' + name, userData);
		}

		return {
			getStuff: getStuff,
			addStuff: addStuff,
			updateStuff: updateStuff,
			deleteStuff: deleteStuff,
			findStuff: findStuff
		};
	}
})();
