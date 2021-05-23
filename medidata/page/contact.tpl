<%- include('partial/head.tpl') %>
<%- include('partial/header.tpl') %>

<%- include('blocks/inner_header.tpl', {x: 'Contact'}) %>

<section class="inner-content">
  <div class="container">
    <div class="row">

      <%- include('blocks/contact_form.tpl') %>
      <%- include('blocks/location.tpl') %>


    </div>
  </div>
</section>

<%- include('partial/foot.tpl') %>
<%- include('partial/footer.tpl') %>
