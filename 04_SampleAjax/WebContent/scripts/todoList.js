$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/tasks";
	
	var currentTaskId;
	
	function taskEndpoint(taskId) {
		return ENDPOINT + "/" + taskId;
	}

	function showPanel(panelName) {
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];
		
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		
		$("#"+panelName).show();
	}

	function listTasks() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function readTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function createTask(taskInfo) {
		return $.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(taskInfo),
			dataType: "json"
		});
	}
	
	function deleteTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "DELETE"
		});
	}
	
	function updateTask(taskId, data) {
		return $.ajax(taskEndpoint(taskId), {
			method: "PUT",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(data),
			dataType: "json"
		})
	}
	
	function showTaskView(task) {
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		
		showPanel("readPanel");
	}
	
	function reloadTasks() {
		listTasks().then(function(response) {
			function addTaskToList(task) {
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}
			
			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});
	}
	
	function setUpdateHandler() {
		$("#updatePanel .task-action-ok").click(function() {
			var updatedTitle = $("#updatePanel input").val();
			var updatedDescription = $("#updatePanel textarea").val();
			
			var data = {
				title: updatedTitle,
				description: updatedDescription
			};

			updateTask(currentTaskId, data).then(reloadTasks);
		});
	}
	
	function setReadHandler() {
		$("#readPanel .task-action-ok").click(function() {
			var title = $("#readPanel .task-title:first").text();
			var description = $("#readPanel .task-description").text();

			$("#updatePanel input").val(title);
			$("#updatePanel textarea").val(description);
			
			showPanel("updatePanel");
		});
	}
	
	function setCreateHandler() {
		$("#createPanel .task-action-ok").on("click", function() {
			var titleVal = $("#createPanel input").val();
			var descriptionVal = $("#createPanel textarea").val();
			
			var task = {
				title: titleVal,
				description: descriptionVal
			};
			
			createTask(task).then(reloadTasks);
			
			showPanel("emptyPanel");
		});
	}
	
	function attachHandlers() {
		$(document).on("click", "#tasksList [data-task-id]", function() {
			currentTaskId = $(this).attr("data-task-id");
			readTask(currentTaskId).then(showTaskView);
		});
		
		$(document).on("click", "#addTaskButton", function() {
			showPanel("createPanel");
		});

		$(document).on("click", ".task-action-cancel", function() {
			showPanel("emptyPanel");
		});
		
		$(document).on("click", ".task-action-remove", function() {
			var taskId = $(this).attr("data-task-id");
			
			deleteTask(currentTaskId).then(reloadTasks);

			showPanel("emptyPanel");
		});

		setCreateHandler();
		setReadHandler();		
		setUpdateHandler();
	}
	
	attachHandlers();
	reloadTasks();
});
