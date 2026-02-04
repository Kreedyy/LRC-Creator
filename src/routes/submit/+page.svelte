<script lang="ts">
  import { page } from '$app/state';

  const { lyrics } = page.state as {
    lyrics?: string;
  };
</script>

<p>{lyrics}</p>