$(function(){
    var folder = "app/html/parts/"

    $("#includeHeader").load(folder + "header.html"); 
    $("#includeFooter").load(folder + "footer.html"); 
    $("#includeSidebar").load(folder + "sidebar.html");
    $("#includeJavascripts").load(folder + "javascripts.html");
    $("#includeLogoutModal").load(folder + "modals/logout.html");
    $("#includeNewOrderModal").load(folder + "modals/new_order.html");
    $("#includeBlockchainLoaderModal").load(folder + "modals/blockchain_loader.html");

    // Content
    $("#includeMinerSell").load(folder + "contents/content_miner_sell.html");
    $("#includeMinerSearch").load(folder + "contents/content_miner_search.html");
    $("#includeBuyerPostAd").load(folder + "contents/content_buyer_post_ad.html"); 
    $("#includeBuyerSearch").load(folder + "contents/content_buyer_search.html"); 
});