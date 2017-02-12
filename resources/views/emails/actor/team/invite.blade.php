You have been invited to join team {{$team->name}}.<br>
To accept the invitation click: <a href="{{ route('actor.team.invite_accept', $invite->accept_token) }}">{{ route('actor.team.invite_accept', $invite->accept_token) }}</a>
<br>or to decline the invitation click: <a href="{{ route('actor.team.invite_decline', $invite->deny_token) }}">{{ route('actor.team.invite_decline', $invite->deny_token) }}</a>
