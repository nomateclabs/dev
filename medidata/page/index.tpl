
<%- include('partial/head.tpl') %>
<%- include('partial/header.tpl') %>

<%- include('blocks/slide.tpl') %>
<%- include('blocks/services_offered.tpl') %>
<%- include('blocks/special.tpl') %>
<%- include('blocks/about_item.tpl') %>
<%- include('blocks/latest_news.tpl', {x: db.models.Post}) %>
<%- include('blocks/callout.tpl', {x: callout.main}) %>
<%- include('blocks/sponsor.tpl') %>

<%- include('partial/foot.tpl') %>
<%- include('partial/footer.tpl') %>
