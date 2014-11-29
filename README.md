API Wrappers
===================

#Instagram:

https://mediadashapi.herokuapp.com/insta?term=dbc

#Routes
<table>
  <thead>
    <th>HTTP Verb</th>
    <th>URI</th>
    <th>Description</th>
    <th colspan=2>Example</th>
</thead>
<tbody>
 <tr>
    <td>GET</td>
    <td>/insta?term=<term></td>
    <td>Returns up to 20 most recent insta's with this term</td>
    <td colspan=2>[
          { "instagramId":"863806489269250001_270206160",
            "username":"alex_lovetro",
            "userProfilePic":"https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xap1/10654884_793277300722416_1868987071_a.jpg",
            "text":"Doods playing Drooms in Central Poork. #CentralParkBeats #Stock #8s? #DBC",
            "location":null,
            "timestamp":"1417193779",
            "hashtags":["8s","dbc","centralparkbeats","stock"],
            "image":"http://scontent-a.cdninstagram.com/hphotos-xpf1/t51.2885-15/10693619_1502540056674581_546774803_n.jpg",
            "likes":63,
            "filter":"Normal"
          },
          ...
        ]</td>
</tr>
</tbody>
</table>

===================
#Twitter:

https://mediadashapi.herokuapp.com/twitter?term=dbc

<table>
  <thead>
    <th>HTTP Verb</th>
    <th>URI</th>
    <th>Description</th>
    <th colspan=2>Example</th>
</thead>
<tbody>
 <tr>
    <td>GET</td>
    <td>/twitter?term=<term></td>
    <td>Returns up to 20 most recent insta's with this term</td>
    <td colspan=2>[
          { "instagramId":"863806489269250001_270206160",
            "username":"alex_lovetro",
            "userProfilePic":"https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xap1/10654884_793277300722416_1868987071_a.jpg",
            "text":"Doods playing Drooms in Central Poork. #CentralParkBeats #Stock #8s? #DBC",
            "location":null,
            "timestamp":"1417193779",
            "hashtags":["8s","dbc","centralparkbeats","stock"],
            "image":"http://scontent-a.cdninstagram.com/hphotos-xpf1/t51.2885-15/10693619_1502540056674581_546774803_n.jpg",
            "likes":63,
            "filter":"Normal"
          },
          ...
        ]</td>
</tr>
</tbody>
</table>
===================
