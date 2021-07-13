$(function() {
    $.getJSON("https://api.github.com/orgs/Happy-and-Smile/repos", repos => {
        $("#repos").html("");

        for (const repo of repos) {
            addRepo(repo["name"], repo["releases_url"])
        }
    });
});

function addRepo(repo, release) {
    $("#repos").append(
        `<div class="box" style="width: 70%; margin: 2vh auto;">
            <a style="padding-top: 1vh;" class="link_repo" href="https://github.com/Happy-and-Smile/${repo}">
                <img alt="profile" src="resource/svg/github.svg" class="profile_icon">
                <span>${repo}</span>
            </a>
            <table id="projects_${repo}" class="info_table"></table>
        </div>`
    );
    let table = $("#projects_" + repo);

    $.getJSON(release.replace("{/id}", ""), Releases => {
        for (const release of Releases) {
            let name = release["name"]
            let pre = release["prerelease"]
            let body = release["body"]
            let url = release["html_url"]
            let published = release["published_at"]
            addRelease(name, pre, body, url, table, repo, published)
        }
    })

    // Alphabetical sorting (abandoned projects to the bottom)
    //$(table).append(table.children("tr").sort((a, b) => sortProjects($(a), $(b))));
}

function addRelease(name, pre, body, url, table, repo, published) {
    table.append(
        `<tr class="${pre == true ? "pre-release" : "release"}" project="${repo}">
            <td class="icon">
                <img alt="project page" src="${pre == true ? "resource/svg/pre-release.svg" : "resource/svg/release.svg"}" />
            </td>
            <td class="table_label" style="width: auto;">
                <a class="link_info" href="${url}">${name}</a>
            </td>
            <td>
            <td>
                <a class="inner">
                    ${body.slice(0, 15)}
                </a>
            </td>
            <td class="date">
                <a>
                    ${published}
            </a>
            </td>
        </tr>
    `);
}