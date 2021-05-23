<section class="inner-content">
  <div class="container">
    <h1 class="title-bottom-line"><strong>Frequent</strong> QUESTIONS</h1>
    <p><%= pages.faq.sub %></p>
    <br><br>

    <div class="panel-group faq" id="accordion">

      <% for (let i = 0; i < pages.faq.items.length; i++) { %>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapse<%= i %>"><%= pages.faq.items[i].question %></a>
          </h4>
        </div>
        <div id="collapse<%= i %>" class="panel-collapse collapse">
          <div class="panel-body">
            <h3><%= pages.faq.items[i].head %></h3>
            <br>
            <p><%= pages.faq.items[i].answer %></p>
          </div>
        </div>
      </div>
      <% } %>

    </div>
  </div>
</section>
