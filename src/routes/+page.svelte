<script lang="ts">
  import 'iconify-icon';
</script>

<svelte:head>
  <title>DuckLearn | Home</title>
</svelte:head>

<section class="hero max-w-xl">
  <div class="hero-content flex-col text-center">
    <img src="https://placekitten.com/512/256" alt="Banner" class="w-full rounded-box" />

    <h1 class="text-2xl">Bem-vindo, <span class="text-primary font-bold">Explorador</span>!</h1>

    <p>
      Seja muito bem vindo ao <span class="text-primary font-bold">DuckLearn</span>, um site de
      <i>aprendizado</i> e <i>ensinamento</i>. Sinta-se livre para explorar os cursos disponíveis,
      posts, discussões e/ou vídeos. Junte-se a mais de
      <span class="text-primary font-bold">1,000+ exploradores</span> assim como você!
    </p>

    <div class="divider italic">Preparado para embarcar?</div>

    <a class="btn btn-primary w-full" href="/register">
      <iconify-icon icon="ion:rocket-sharp" width={24} />
      Começar sua jornada
    </a>
    <p>
      Já é um explorador?
      <a class="link link-primary" href="/login">Retome sua jornada</a>!
    </p>
  </div>
</section>
